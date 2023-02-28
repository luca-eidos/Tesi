#include "Image.h"
#include "utils.h"

int main(int argc, char **argv)
{
  if (argc != 3)
  {
    fprintf(stderr, "Usage: %s <input> <output>\n", argv[0]);
    exit(1);
  }

  Image img_input, img_output;

  Image_load(&img_input, argv[1]);
  ON_ERROR_EXIT(img_input.data == NULL, "Error in loading the image");

  // Convert the image to gray
  Image_to_gray(&img_input, &img_output);

  // Save image
  Image_save(&img_output, argv[2]);

  // Release memory
  Image_free(&img_input);
  Image_free(&img_output);
}