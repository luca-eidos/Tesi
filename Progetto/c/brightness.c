#include "Image.h"
#include "utils.h"

int main(int argc, char **argv)
{
  if (argc != 4)
  {
    fprintf(stderr, "Usage: %s <input> <output> <percentage>\n", argv[0]);
    return 1;
  }

  Image img_input, img_output;
  int percentage = atoi(argv[3]);
  float brightness = (float) percentage / 100.0;

  Image_load(&img_input, argv[1]);
  ON_ERROR_EXIT(img_input.data == NULL, "Error in loading the image");

  // Adjust the brightness
  if (Image_adjust_brightness(&img_input, &img_output, brightness))
  {
    // Save image
    Image_save(&img_output, argv[2]);
  }

  // Release memory
  Image_free(&img_input);
  Image_free(&img_output);
}