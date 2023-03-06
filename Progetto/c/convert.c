#include "Image.h"
#include "utils.h"

int main(int argc, char **argv)
{
  if (argc != 3)
  {
    fprintf(stderr, "Usage: %s <input> <output>\n", argv[0]);
    return(1);
  }

  Image img_input;

  Image_load(&img_input, argv[1]);
  ON_ERROR_EXIT(img_input.data == NULL, "Error in loading the image");

  // Save image
  Image_save(&img_input, argv[2]);

  // Release memory
  Image_free(&img_input);
}