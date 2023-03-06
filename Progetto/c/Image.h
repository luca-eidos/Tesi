#ifndef __IMAGE_H
#define __IMAGE_H

#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <math.h>
#include "utils.h"

enum allocation_type
{
  NO_ALLOCATION,
  SELF_ALLOCATED,
  STB_ALLOCATED
};

typedef struct
{
  int width;
  int height;
  int channels;
  size_t size;
  uint8_t *data;
  enum allocation_type allocation_;
} Image;

void Image_load(Image *img, const char *fname);
void Image_create(Image *img, int width, int height, int channels, bool zeroed);
int Image_save(const Image *img, const char *fname);
void Image_free(Image *img);
int Image_to_gray(const Image *orig, Image *gray);
int Image_to_sepia(const Image *orig, Image *sepia);
int Image_resize(const Image *orig, Image *resized, int percentage);
int Image_rotate_90(const Image *orig, Image *rotated);
int Image_adjust_brightness(const Image *orig, Image *adj, float brightness);
int Image_crop(const Image *orig, Image *cropped, int x1, int y1, int x2, int y2);

#endif