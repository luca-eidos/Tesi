#include <stdio.h>
#include <stdint.h>
#include <math.h>

#include "stb/stb_image.h"
#include "stb/stb_image_write.h"

void adjust_contrast(unsigned char *image_data, int image_width, int image_height, int num_channels, float contrast)
{
  // Calculate the scaling factor based on the contrast value
  float scale_factor = (259.0f * (contrast + 255.0f)) / (255.0f * (259.0f - contrast));

  // Loop through each pixel in the image
  for (int y = 0; y < image_height; y++)
  {
    for (int x = 0; x < image_width; x++)
    {
      // Calculate the index of the first pixel component
      int index = (y * image_width + x) * num_channels;

      // Loop through each pixel component (e.g. R, G, B)
      for (int c = 0; c < num_channels; c++)
      {
        // Get the current pixel value
        unsigned char pixel_value = image_data[index + c];

        // Adjust the pixel value using the scaling factor
        float adjusted_value = (pixel_value - 128.0f) * scale_factor + 128.0f;

        // Clamp the adjusted value to the valid range of [0, 255]
        adjusted_value = fmaxf(fminf(adjusted_value, 255.0f), 0.0f);

        // Set the new pixel value
        image_data[index + c] = (unsigned char)adjusted_value;
      }
    }
  }
}

int main(int argc, char **argv)
{
  if (argc != 4)
  {
    fprintf(stderr, "Usage: %s <input> <output> <percentage>\n", argv[0]);
    exit(1);
  }

  // Load input image
  int width, height, channels;
  unsigned char *image = stbi_load(argv[1], &width, &height, &channels, 0);
  if (image == NULL)
  {
    printf("Error loading image\n");
    return 1;
  }

  // Adjust contrast
  float contrast = atoi(argv[3]) / 100.0;
  adjust_contrast(image, width, height, channels, contrast);

  // Save output image
  stbi_write_jpg(argv[2], width, height, channels, image, 100);

  // Free memory
  stbi_image_free(image);

  return 0;
}
