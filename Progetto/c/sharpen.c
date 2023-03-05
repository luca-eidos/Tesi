#include <stdio.h>
#include <stdint.h>
#define STB_IMAGE_IMPLEMENTATION
#include "stb/stb_image.h"
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb/stb_image_write.h"

#define CHANNELS 3 // number of color channels

// Function to sharpen an image using STB library
void sharpen(unsigned char *data, int width, int height, int channels)
{
  int stride = width * channels;

  // Allocate memory for temporary buffer
  unsigned char *temp = malloc(stride * height * sizeof(unsigned char));
  if (!temp)
  {
    printf("Failed to allocate memory for temporary buffer!\n");
    return;
  }

  // Apply sharpening filter
  for (int y = 1; y < height - 1; y++)
  {
    for (int x = 1; x < width - 1; x++)
    {
      for (int c = 0; c < channels; c++)
      {
        int idx = (y * stride) + (x * channels) + c;
        float val = 5.0 * data[idx] - data[idx - channels] - data[idx + channels] - data[idx - stride] - data[idx + stride];
        temp[idx] = (uint8_t)(val > 255 ? 255 : val);
      }
    }
  }

  // Copy result back to input buffer
  memcpy(data, temp, stride * height * sizeof(unsigned char));

  // Free memory
  free(temp);
}

int main(int argc, char **argv)
{
  if (argc != 3)
  {
    fprintf(stderr, "Usage: %s <input> <output>\n", argv[0]);
    return 1;
  }

  int width, height, orig_channels;
  unsigned char *image = stbi_load(argv[1], &width, &height, &orig_channels, CHANNELS);
  if (!image)
  {
    printf("Failed to load image!\n");
    return -1;
  }

  // Apply sharpening effect
  sharpen(image, width, height, CHANNELS);

  // Save output image
  stbi_write_png(argv[2], width, height, CHANNELS, image, width * CHANNELS);

  // Free memory
  stbi_image_free(image);

  return 0;
}
