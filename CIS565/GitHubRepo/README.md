How to make an attractive GitHub repo
=====================================

A guide for [CIS 565](http://www.seas.upenn.edu/~cis565/) students by [Patrick Cozzi](http://www.seas.upenn.edu/~pcozzi/).

Last updated: September 11, 2016

A good README.md
----------------

Presenting your work well is at least as important as the quality of the work itself.  The web is full of noise and visitors will quickly move on if you do not grab their attention immediately.

Do not keep the original `README.md` with our project instructions.  Instead, completely rewrite it so it introduces your project to a technical hiring manager or developer.  Remember, things that are obvious to you might not be obvious to them so provide enough background and context.

### Representative image

The `README.md` should start with a title, followed by your name (with a link to your website, twitter, blog, etc. with your contact info), and then a representative image of your work.  Including an image like this has been tradition in SIGGRAPH and many other graphics venues for years.  Here's some good examples:

   * [GPU-Accelerated Dynamic Fracture in the Browser](https://github.com/kainino0x/cis565final) by Jiatong He and Kai Ninomiya
   * [Surface Mesh Reconstruction from RGBD Images](https://github.com/cboots/RGBD-to-Mesh) by Collin Boots and Dalton Banks
   * [Accelerated Stochastic Progressive Photon Mapping on the GPU](https://github.com/ishaan13/PhotonMapper) by Ishaan Singh, Yingting Xiao, and Xiaoyan Zhu
   
Here's the photon mapping image:

![](Figures/photonmapping.png)

The image should be representative in that it highlights the breadth and depth of your work.  It should be your favorite showpiece.  Make sure the resolution is reasonable so it downloads quickly.  Do not use `bmp` files; use `png` or `jpg`.

### Screenshots

Show.  Don't tell.

Use screenshots with captions to build up the features in your project.  For example, see:

* [WebGL Interactive Water](https://github.com/dblsai/WebGL-Fluid) by Binglu Du and Xingjie Ma

In this project, each feature is highlighted with a screenshot (animated gifs actually work quite well here).  Scroll down to the `Water Simulationn` section where they introduce the components of the fluid simulation with screenshots starting with just the height map and then building up to object interaction.

The representative image for [Surface Mesh Reconstruction from RGBD Images](https://github.com/cboots/RGBD-to-Mesh) also nicely builds up its features and pipeline:

![](Figures/rgbd-to-mesh.png)

### Annotate

In addition to screenshots that highlight each feature, it is illustrative to annotate a representative image, perhaps even _the_ representative image.  Point out each feature like Kai Ninomiya did in his [GPU path tracer](https://github.com/kainino0x/Project3-Pathtracer):

![](Figures/annotated.jpg)

I know the caustics and Fresnel are obvious to you, but they are not obvious to everyone.

### Debug screenshots

Debug views are useful while developing, but they are also _really useful_ to explain how your project works.  A few good examples are:

* [GPU Ray Tracer](https://github.com/cboots/Project1-RayTracer) by Collin Boots
* [Deferred Shader](https://github.com/otaku690/GLSLDeferredShading) by Cheng-Tso Lin
* [Uniform grid and kd-tree in CUDA](https://github.com/jeremynewlin/Accel) by Jeremy Newlin and Danny Rerucha

In Collin's ray tracer, the following screenshots show distance to the closest surface, normals, and oversampling.

![](Figures/raydebug0.png)
![](Figures/raydebug1.png)
![](Figures/raydebug2.png)

For a deferred shader, it is insightful to show each texture in the g-buffer like, for example, the depth and normal buffers in Cheng's deferred shader:

![](Figures/deferreddebug0.jpg)
![](Figures/deferreddebug1.jpg)

For some projects, the only visual output will be debug views.  In Jeremy and Danny's spatial data structure project, this screenshot shows nearest neighbor search:

![](Figures/nearest.png)

### Side-by-side comparisons

It is instructive to highlight features by showing side-by-side screenshots, one with the feature and one without.  Some good examples are:

* [Deferred Shader](https://github.com/cboots/Deferred-Shading) by Collin Boots
* [GPU Path Tracer](https://github.com/foxking0416/Project3-Pathtracer) by Wei-Chien Tu

Here's the bump mapping screenshots in Collin's deferred shader:

![](Figures/bump0.png)

![](Figures/bump1.png)
![](Figures/bump2.png)

The first screenshot shows the bump map itself, the second is the surface shaded without the bump map, and the third is the surface shaded with the bump map clearly showing the additional detail.

Here's the anti-aliasing screenshot in Wei-Chien's path tracer:

![](Figures/aa2.png)

Wei-Chien also included a description and image that presents the implementation:

![](Figures/aa.png)

Recall that your audience is not me nor is it the teaching assistant; it is technical hiring managers and developers.  Therefore, it is useful to target a broad audience.

Similar to side-by-side feature comparisons, it is also instructive to tweak key parameters and take multiple screenshots to show the effect of the parameter.  For example, here are two screenshots showing depth-of-field in Wei-Chien's path tracer.  Both have a focal length of 10.  The first has an aperture radius of 0.2; the second is 0.5.  Note the clear difference in the area out of focus.

![](Figures/radius02.png)

![](Figures/radius05.png)

To help a broad audience, Wei-Chien also included some details and a screenshot on the algorithm itself:

![](Figures/dof.png)

### Bloopers

We all make mistakes while coding.  If a bug results in an interesting image, feel free to share it in a bloopers section with a description of what was wrong.  For examples, see [I Get Your Fail](http://igetyourfail.blogspot.com/).

### Demos and videos

If your project uses WebGL, host it using [GitHub Pages](https://pages.github.com/) and have a prominent link to it in your `README.md`.  The representative image can also link to it.  Make sure your demo:

* Has a link back to your github repo since people might link directly to your demo.
* Has your name and a link to your website.
* Includes instructions on how to use it.
* Fails gracefully if WebGL or any required extensions are not supported.
* Has a UI to tweak parameters and show debug views (use [dat.GUI](https://code.google.com/p/dat-gui/)).

A great example is [WebGL Interactive Water](http://dblsai.github.io/WebGL-Fluid/).

If you can't provide a live demo or you are using a WebGL extension that is not widely supported, create a video and link to it from the `README.md` (since we can't embed YouTube videos in markdown files, it can be useful to take a screenshot of the YouTube video before it starts and then use it as a link to your video).  Like the demo, the video should include a link to your github repo and personal website for when people link directly to your video.  For an example, see [Surface Mesh Reconstruction from RGBD Images](https://www.youtube.com/watch?v=pg0YZ76ZZw4).

#### Animated gifs

Animated gifs were hot in the 1990's and they have made a come back!  Since we can't embed YouTube videos in markdown, another alternative is to create an animated gif using [LICEcap](http://www.cockos.com/licecap/), which is very easy to use.  Here's an example from [Baking Ambient Occlusion in the glTF Pipeline](http://cesiumjs.org/2016/08/08/ambient-occlusion/):

![](http://cesiumjs.org/images/blogs/IntroducingAmbientOcclusion/day-and-night.gif)

### Performance analysis

Our course is all about performance so each project should include detailed and insightful performance analysis.  This includes both the high-level takeaways and graphs and charts with data supporting the claims.  Include the details of the system used for performance tests, including the CPU, GPU, amount of memory, OS, and browser and version (if it is a WebGL app).

For running performance tests, see [WebGL Profiling Tips](http://cesiumjs.org/2014/12/01/WebGL-Profiling-Tips/). For C++ apps, make sure you are using a release build.

Here's some examples of projects with great performance analysis:

* [Uniform grid and kd-tree in CUDA](https://github.com/jeremynewlin/Accel) by Jeremy Newlin and Danny Rerucha
* [GPU path tracer](https://github.com/kainino0x/Project3-Pathtracer) by Kai Ninomiya
* [CUDA Rasterizer](https://github.com/zxm5010/Project4-Rasterizer) by Zhenghan Mei
* [Accelerated Stochastic Progressive Photon Mapping on the GPU](https://github.com/ishaan13/PhotonMapper) by Ishaan Singh, Yingting Xiao, and Xiaoyan Zhu

### Build instructions

Include concise instructions on how to build your project, including what software is required, e.g., CUDA drivers, Visual Studio, etc.  Make building as simple as possible and avoid the need to set environment variables, chase down third-party dependencies, etc.

### Use direct and concise writing

Read the [Elements of Style](http://www.bartleby.com/141/).  Follow its advice and _make every word tell_.  Have someone proofread your `README.md`.

### Focus on what is unique

Up until the final project, we will implement similar projects: path tracer, rasterizer, deferred shader, etc.  Each project provides opportunities to develop custom features.  Select these based on your strengths and interests and make sure your `README.md` highlights them.

As a recruiter, I have been to many career fairs where every computer science student told me about the same project. Boring.  Differentiate yourself by highlighting what is unique about your work.

More tips
---------

* Feel free to rename your fork of the starter-code repo.  For example, just because we named a repo `Project6-DeferredShader`, doesn't mean you have to.  Likewise, feel free to edit the description at the top of the repo page.
* Don't clutter the root directory with many files because it will force visitors to have to scroll a lot to get to your `README.md`.
