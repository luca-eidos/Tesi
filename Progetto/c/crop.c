#include "Image.h"
#include "utils.h"

int main(int argc, char **argv)
{
  if (argc != 7)
  {
    fprintf(stderr, "Usage: %s <input> <output> <x1> <y1> <x2> <y2>\n", argv[0]);
    return(1);
  }

  Image img_input, img_output;
  int x1 = atoi(argv[3]);
  int y1 = atoi(argv[4]);
  int x2 = atoi(argv[5]);
  int y2 = atoi(argv[6]);

  Image_load(&img_input, argv[1]);
  ON_ERROR_EXIT(img_input.data == NULL, "Error in loading the image");

  // Adjust the brightness
  if (Image_crop(&img_input, &img_output, x1, y1, x2, y2))
  {
    // Save image
    Image_save(&img_output, argv[2]);
  }

  // Release memory
  Image_free(&img_input);
  Image_free(&img_output);
}