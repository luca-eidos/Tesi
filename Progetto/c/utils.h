#ifndef __UTILS_H
#define __UTILS_H

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

// Error utility macro
#define ON_ERROR_EXIT(cond, message)                                    \
  do                                                                    \
  {                                                                     \
    if ((cond))                                                         \
    {                                                                   \
      printf("Error in function: %s at line %d\n", __func__, __LINE__); \
      perror((message));                                                \
      return 0;                                                          \
    }                                                                   \
  } while (0)

// Check if a string "str" ends with a substring "ends"
static inline bool str_ends_in(const char *str, const char *ends)
{
  char *pos = strrchr(str, '.');
  return !strcmp(pos, ends);
}

#endif