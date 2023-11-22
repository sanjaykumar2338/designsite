<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Product</title>
</head>
<body>
    <h1>create product</h1>
</body>
</html><!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.min.js"
        integrity="sha512-CeIsOAsgJnmevfCi2C7Zsyy6bQKi43utIjdA87Q0ZY84oDqnI0uwfM9+bKiIkI75lUeI00WG/+uJzOmuHlesMA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

    <!-- <script
      src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.js"
      integrity="sha512-hOJ0mwaJavqi11j0XoBN1PtOJ3ykPdP6lp9n29WVVVVZxgx9LO7kMwyyhaznGJ+kbZrDN1jFZMt2G9bxkOHWFQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script> -->
</head>

<body>
    <div class="flex gap-2">
        <div class="flex flex-col">
            <button class="hover:bg-slate-200 h-[50px] w-[50px]" onclick="setSelected(1)">
                <img src="./blank-t-shirt.jpg" class="h-full" alt="" />
            </button>
            <button class="hover:bg-slate-200 h-[50px] w-[50px]" onclick="setSelected(2)">
                <img src="./poster.jpg" class="h-full" alt="" />
            </button>
            <button class="hover:bg-slate-200 h-[50px] w-[50px]" onclick="setSelected(3)">
                <img src="./signage.jpg" class="h-full" alt="" />
            </button>
        </div>
        <div style="position: relative" id="canvasParent">
            <div style="height: 500px; width: 500px; position: absolute" id="canvasBgImage"></div>
            <div style="height: 500px; width: 500px; position: relative">
                <div class="border-[1px] border-neutral-300" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-43%, -70%);
                            z-index: 10;
                        ">
                    <canvas id="c" width="200" height="250" style="border: 1px; border-color: black"></canvas>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2" id="editables"></div>
    </div>
    <div class="flex gap-4">
        {{-- <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="setShowModal(true)">
            Add Image
        </button> --}}
        <input id="image-picker" type="file" accept="image/*" class="w-[200px]" onchange="onImagePikked()" />

        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addText()">
            Add Text
        </button>

        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="htmltoCanvas()">
            Place order
        </button>
    </div>
    <div id="text-controls-additional">
        <div class="flex gap-2 m-2">
            T-shirt Size :
            <input type="radio" id="X" name="fav_language" value="X" />
            <label for="X">X</label>
            <br />
            <input type="radio" id="M" name="fav_language" value="M" />
            <label for="M">M</label>
            <br />
            <input type="radio" id="L" name="fav_language" value="L" />
            <label for="L">L</label>
        </div>
        <div class="grid grid-cols-3 w-[250px]">
            <div class="col-span-3">Objects:</div>
            <!-- <button
        class="border rounded-lg p-2 px-3 hover:bg-slate-200"
        onclick="addLine()"
      >
        Line
      </button>
      <button
        class="border rounded-lg p-2 px-3 hover:bg-slate-200"
        onclick="addRect()"
      >
        Rectangle
      </button>
      <button
        class="border rounded-lg p-2 px-3 hover:bg-slate-200"
        onclick="addCircle()"
      >
        Circle
      </button>
      <button
        class="border rounded-lg p-2 px-3 hover:bg-slate-200"
        onclick="addTriangle()"
      >
        Triangle
      </button> -->

            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`1-circle-1.svg`)">
                <img src="objects/1-circle-1.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`1-circle-2.svg`)">
                <img src="objects/1-circle-2.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`1-circle-3.svg`)">
                <img src="objects/1-circle-3.svg" width="50px" alt="" />
            </button>

            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`2-rect-1.svg`)">
                <img src="objects/2-rect-1.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`2-rect-2.svg`)">
                <img src="objects/2-rect-2.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`2-rect-3.svg`)">
                <img src="objects/2-rect-3.svg" width="50px" alt="" />
            </button>

            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`3-triangle-1.svg`)">
                <img src="objects/3-triangle-1.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`3-triangle-2.svg`)">
                <img src="objects/3-triangle-2.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`3-triangle-3.svg`)">
                <img src="objects/3-triangle-3.svg" width="50px" alt="" />
            </button>

            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`5-poly-1.svg`)">
                <img src="objects/5-poly-1.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`5-poly-2.svg`)">
                <img src="objects/5-poly-2.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`5-poly-3.svg`)">
                <img src="objects/5-poly-3.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`6-poly-1.svg`)">
                <img src="objects/6-poly-1.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`6-poly-2.svg`)">
                <img src="objects/6-poly-2.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`6-poly-3.svg`)">
                <img src="objects/6-poly-3.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`7-arrow-1.svg`)">
                <img src="objects/7-arrow-1.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`7-arrow-2.svg`)">
                <img src="objects/7-arrow-2.svg" width="50px" alt="" />
            </button>

            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`7-arrow-3.svg`)">
                <img src="objects/7-arrow-3.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                onclick="addObjectImage(`bookmark-shapes.svg`)">
                <img src="objects/bookmark-shapes.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`circle.svg`)">
                <img src="objects/circle.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`cloud.svg`)">
                <img src="objects/cloud.svg" width="50px" alt="" />
            </button>

            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`cube.svg`)">
                <img src="objects/cube.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`heart.svg`)">
                <img src="objects/heart.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`moon.svg`)">
                <img src="objects/moon.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="addObjectImage(`star.svg`)">
                <img src="objects/star.svg" width="50px" alt="" />
            </button>
        </div>
    </div>

    <!-- MODEL START -->
    <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal" hidden>
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                &#8203;
            </span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <label class="font-medium text-gray-800">Image Url</label>
                    <input type="text" id="imgUrl" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                        value="https://cloudfour.com/examples/img-currentsrc/images/kitten-small.png" />
                </div>
                <div class="bg-gray-200 px-4 py-3 text-right">
                    <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                        onclick="setShowModal(false)">
                        Cancel
                    </button>
                    <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                        type="submit" onclick="submitImgUrl()">
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- MODEL END -->
</body>
<script src="./html2canvas.min.js"></script>
<script src="./script.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    clifford: "#da373d",
                },
            },
        },
    };
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

</html>