#include "Image.h"
#include <math.h>
#include <stdint.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb/stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb/stb_image_write.h"
#define STB_IMAGE_RESIZE_IMPLEMENTATION
#include "stb/stb_image_resize.h"

void Image_load(Image *img, const char *fname)
{
  if ((img->data = stbi_load(fname, &img->width, &img->height, &img->channels, 0)) != NULL)
  {
    img->size = img->width * img->height * img->channels;
    img->allocation_ = STB_ALLOCATED;
  }
}

void Image_create(Image *img, int width, int height, int channels, bool zeroed)
{
  size_t size = width * height * channels;
  if (zeroed)
  {
    img->data = calloc(size, 1);
  }
  else
  {
    img->data = malloc(size);
  }

  if (img->data != NULL)
  {
    img->width = width;
    img->height = height;
    img->size = size;
    img->channels = channels;
    img->allocation_ = SELF_ALLOCATED;
  }
}

int Image_save(const Image *img, const char *fname)
{
  // Check if the file name ends in one of the .jpg/.JPG/.jpeg/.JPEG or .png/.PNG
  if (str_ends_in(fname, ".jpg") || str_ends_in(fname, ".JPG") || str_ends_in(fname, ".jpeg") || str_ends_in(fname, ".JPEG"))
  {
    stbi_write_jpg(fname, img->width, img->height, img->channels, img->data, 100);
  }
  else if (str_ends_in(fname, ".png") || str_ends_in(fname, ".PNG"))
  {
    stbi_write_png(fname, img->width, img->height, img->channels, img->data, img->width * img->channels);
  }
  else
  {
    ON_ERROR_EXIT(false, "");
  }

  return 1;
}

void Image_free(Image *img)
{
  if (img->allocation_ != NO_ALLOCATION && img->data != NULL)
  {
    if (img->allocation_ == STB_ALLOCATED)
    {
      stbi_image_free(img->data);
    }
    else
    {
      free(img->data);
    }
    img->data = NULL;
    img->width = 0;
    img->height = 0;
    img->size = 0;
    img->allocation_ = NO_ALLOCATION;
  }
}

int Image_to_gray(const Image *orig, Image *gray)
{
  ON_ERROR_EXIT(!(orig->allocation_ != NO_ALLOCATION && orig->channels >= 3), "The input image must have at least 3 channels.");
  int channels = orig->channels == 4 ? 2 : 1;
  Image_create(gray, orig->width, orig->height, channels, false);
  ON_ERROR_EXIT(gray->data == NULL, "Error in creating the image");

  for (unsigned char *p = orig->data, *pg = gray->data; p != orig->data + orig->size; p += orig->channels, pg += gray->channels)
  {
    *pg = (uint8_t)((*p + *(p + 1) + *(p + 2)) / 3.0);
    if (orig->channels == 4)
    {
      *(pg + 1) = *(p + 3);
    }
  }

  return 1;
}

int Image_to_sepia(const Image *orig, Image *sepia)
{
  ON_ERROR_EXIT(!(orig->allocation_ != NO_ALLOCATION && orig->channels >= 3), "The input image must have at least 3 channels.");
  Image_create(sepia, orig->width, orig->height, orig->channels, false);
  ON_ERROR_EXIT(sepia->data == NULL, "Error in creating the image");

  // Sepia filter coefficients from https://stackoverflow.com/questions/1061093/how-is-a-sepia-tone-created
  for (unsigned char *p = orig->data, *pg = sepia->data; p != orig->data + orig->size; p += orig->channels, pg += sepia->channels)
  {
    *pg = (uint8_t)fmin(0.393 * *p + 0.769 * *(p + 1) + 0.189 * *(p + 2), 255.0);       // red
    *(pg + 1) = (uint8_t)fmin(0.349 * *p + 0.686 * *(p + 1) + 0.168 * *(p + 2), 255.0); // green
    *(pg + 2) = (uint8_t)fmin(0.272 * *p + 0.534 * *(p + 1) + 0.131 * *(p + 2), 255.0); // blue
    if (orig->channels == 4)
    {
      *(pg + 3) = *(p + 3);
    }
  }

  return 1;
}

int Image_resize(const Image *orig, Image *resized, int percentage)
{
  ON_ERROR_EXIT(!(orig->allocation_ != NO_ALLOCATION && orig->channels >= 3), "The input image must have at least 3 channels.");
  Image_create(resized, orig->width * percentage / 100, orig->height * percentage / 100, orig->channels, false);
  ON_ERROR_EXIT(resized->data == NULL, "Error in creating the image");
  stbir_resize_uint8(orig->data, orig->width, orig->height, 0, resized->data, resized->width, resized->height, 0, orig->channels);

  return 1;
}

int Image_rotate_90(const Image *orig, Image *rotated)
{
  ON_ERROR_EXIT(!(orig->allocation_ != NO_ALLOCATION && orig->channels >= 3), "The input image must have at least 3 channels.");
  Image_create(rotated, orig->height, orig->width, orig->channels, false);
  ON_ERROR_EXIT(rotated->data == NULL, "Error in creating the image");

  int h = orig->height - 1;

  for (int i = 0; i < orig->width; i++)
  {
    for (int j = 0; j < orig->height; j++)
    {
      for (int l = 0; l < orig->channels; l++)
      {
        rotated->data[(i * rotated->width + (h - j)) * orig->channels + l] = orig->data[(j * orig->width + i) * orig->channels + l];
      }
    }
  }

  return 1;
}

int Image_adjust_brightness(const Image *orig, Image *adj, float brightness)
{
  ON_ERROR_EXIT(!(orig->allocation_ != NO_ALLOCATION && orig->channels >= 3), "The input image must have at least 3 channels.");
  Image_create(adj, orig->width, orig->height, orig->channels, false);
  ON_ERROR_EXIT(adj->data == NULL, "Error in creating the image");
  int temp;

  for (int i = 0; i < orig->height * orig->width * orig->channels; i++)
  {
    temp = orig->data[i] * brightness;
    adj->data[i] = (uint8_t)(temp > 255 ? 255 : temp);
  }

  return 1;
}

int Image_crop(const Image *orig, Image *cropped, int x1, int y1, int x2, int y2)
{
  int w = x2 - x1, h = y2 - y1;

  ON_ERROR_EXIT(!(orig->allocation_ != NO_ALLOCATION && orig->channels >= 3), "The input image must have at least 3 channels.");
  Image_create(cropped, w, h, orig->channels, false);
  ON_ERROR_EXIT(cropped->data == NULL, "Error in creating the image");

  for (int i = x1; i < x2; i++)
  {
    for (int j = y1; j < y2; j++)
    {
      for (int k = 0; k < orig->channels; k++)
      {
        cropped->data[((j - y1) * w + (i - x1)) * orig->channels + k] = orig->data[((j * orig->width) + i) * orig->channels + k];
      }
    }
  }

  return 1;
}
