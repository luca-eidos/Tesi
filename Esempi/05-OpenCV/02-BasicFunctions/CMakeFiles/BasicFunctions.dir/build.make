# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.22

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions

# Include any dependencies generated for this target.
include CMakeFiles/BasicFunctions.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/BasicFunctions.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/BasicFunctions.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/BasicFunctions.dir/flags.make

CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj: CMakeFiles/BasicFunctions.dir/flags.make
CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj: BasicFunctions.cpp
CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj: CMakeFiles/BasicFunctions.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj"
	/home/luca/.local/bin/wasic++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj -MF CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj.d -o CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj -c /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions/BasicFunctions.cpp

CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.i"
	/home/luca/.local/bin/wasic++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions/BasicFunctions.cpp > CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.i

CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.s"
	/home/luca/.local/bin/wasic++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions/BasicFunctions.cpp -o CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.s

# Object files for target BasicFunctions
BasicFunctions_OBJECTS = \
"CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj"

# External object files for target BasicFunctions
BasicFunctions_EXTERNAL_OBJECTS =

BasicFunctions: CMakeFiles/BasicFunctions.dir/BasicFunctions.cpp.obj
BasicFunctions: CMakeFiles/BasicFunctions.dir/build.make
BasicFunctions: /usr/local/lib/libopencv_calib3d.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_core.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_dnn.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_features2d.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_flann.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_gapi.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_highgui.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_imgcodecs.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_imgproc.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_ml.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_objdetect.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_photo.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_stitching.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_video.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_videoio.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_imgcodecs.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_dnn.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_calib3d.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_features2d.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_flann.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_imgproc.so.4.7.0
BasicFunctions: /usr/local/lib/libopencv_core.so.4.7.0
BasicFunctions: CMakeFiles/BasicFunctions.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable BasicFunctions"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/BasicFunctions.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/BasicFunctions.dir/build: BasicFunctions
.PHONY : CMakeFiles/BasicFunctions.dir/build

CMakeFiles/BasicFunctions.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/BasicFunctions.dir/cmake_clean.cmake
.PHONY : CMakeFiles/BasicFunctions.dir/clean

CMakeFiles/BasicFunctions.dir/depend:
	cd /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions /home/luca/Tesi/Esempi/05-OpenCV/02-BasicFunctions/CMakeFiles/BasicFunctions.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/BasicFunctions.dir/depend
