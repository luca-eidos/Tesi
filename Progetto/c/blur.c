#define STB_IMAGE_IMPLEMENTATION
#define STB_IMAGE_WRITE_IMPLEMENTATION
#include "stb/stb_image.h"
#include "stb/stb_image_write.h"

#define KERNEL_SIZE 5

void apply_gaussian_blur(unsigned char *image, int width, int height, int channels, float sigma)
{
  float kernel[KERNEL_SIZE][KERNEL_SIZE];

  // Create the Gaussian kernel
  float sum = 0.0f;
  for (int x = 0; x < KERNEL_SIZE; x++)
  {
    for (int y = 0; y < KERNEL_SIZE; y++)
    {
      int dx = x - KERNEL_SIZE / 2;
      int dy = y - KERNEL_SIZE / 2;
      kernel[x][y] = exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
      sum += kernel[x][y];
    }
  }
  for (int x = 0; x < KERNEL_SIZE; x++)
  {
    for (int y = 0; y < KERNEL_SIZE; y++)
    {
      kernel[x][y] /= sum;
    }
  }

  // Apply the kernel to each pixel in the image
  unsigned char *temp = malloc(width * height * channels);
  for (int x = 0; x < width; x++)
  {
    for (int y = 0; y < height; y++)
    {
      float r = 0.0f, g = 0.0f, b = 0.0f;
      for (int i = 0; i < KERNEL_SIZE; i++)
      {
        for (int j = 0; j < KERNEL_SIZE; j++)
        {
          int px = x + i - KERNEL_SIZE / 2;
          int py = y + j - KERNEL_SIZE / 2;
          if (px < 0 || px >= width || py < 0 || py >= height)
          {
            continue;
          }
          float k = kernel[i][j];
          int index = (py * width + px) * channels;
          r += k * image[index];
          g += k * image[index + 1];
          b += k * image[index + 2];
        }
      }
      int index = (y * width + x) * channels;
      temp[index] = (unsigned char)r;
      temp[index + 1] = (unsigned char)g;
      temp[index + 2] = (unsigned char)b;
    }
  }

  memcpy(image, temp, width * height * channels);
  free(temp);
}

int main(int argc, char **argv)
{
  int width, height, channels;
  unsigned char *image = stbi_load(argv[1], &width, &height, &channels, 0);

  float sigma = 2.0f; // adjust blur radius
  apply_gaussian_blur(image, width, height, channels, sigma);

  stbi_write_png(argv[2], width, height, channels, image, width * channels);
  stbi_image_free(image);
  return 0;
}
