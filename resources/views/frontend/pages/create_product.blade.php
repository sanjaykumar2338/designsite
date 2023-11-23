<!DOCTYPE html>
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

    <style>
        .loader {
            border-top-color: #3498db;
            -webkit-animation: spinner 1.5s linear infinite;
            animation: spinner 1.5s linear infinite;
        }

        @-webkit-keyframes spinner {
            0% {
                -webkit-transform: rotate(0deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }

        @keyframes spinner {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.1/fabric.js"
        integrity="sha512-hOJ0mwaJavqi11j0XoBN1PtOJ3ykPdP6lp9n29WVVVVZxgx9LO7kMwyyhaznGJ+kbZrDN1jFZMt2G9bxkOHWFQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
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
                <div class="border-[1px] border-neutral-300"
                    style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-43%, -70%);
                            z-index: 10;
                        ">
                    <canvas id="c" width="200" height="250"
                        style="border: 1px; border-color: black"></canvas>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2" id="editables"></div>
    </div>
    <div class="flex gap-4">
        <button class="border rounded-lg p-2 px-3 hover:bg-slate-200" onclick="setShowModal(true)">
            Add Image
        </button>
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

            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                onclick="addObjectImage(`3-triangle-1.svg`)">
                <img src="objects/3-triangle-1.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                onclick="addObjectImage(`3-triangle-2.svg`)">
                <img src="objects/3-triangle-2.svg" width="50px" alt="" />
            </button>
            <button class="border rounded-lg p-2 px-3 hover:bg-slate-200"
                onclick="addObjectImage(`3-triangle-3.svg`)">
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

    <div id="modal" hidden>
        <div class="fixed z-20 overflow-y-auto top-0 w-full left-0">
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                    &#8203;
                </span>
                <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <label class="font-medium text-gray-800">Image Url</label>
                        <input type="text" id="imgUrl"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
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
    </div>

    <div id="payment-modal" hidden>
        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0">
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
                    &#8203;
                </span>
                <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <label class="font-bold text-gray-800">Payment Details</label>
                        <br>
                        <br>
                        <div id="subtotal" class="font-medium text-gray-800">Subtotal:</div>
                        <div id="shipping" class="font-medium text-gray-800">Shipping:</div>
                        <div id="total" class="font-bold text-gray-800">Total:</div>
                        <br>
                        <br>
                        <label class="font-medium text-gray-800">Name</label>
                        <input type="text" id="payment-modal-name"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="John Smith"
                            placeholder="Full Name" />
                        <label class="font-medium text-gray-800">Email</label>
                        <input type="text" id="payment-modal-email"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="john@gmail.com"
                            placeholder="email" />
                        <label class="font-medium text-gray-800">Phone Number</label>
                        <input type="text" id="payment-modal-phone"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="7384728374"
                            placeholder="Phone Number" />
                        <label class="font-medium text-gray-800">Address</label>
                        <input type="text" id="payment-modal-address"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="19749 Dearborn St"
                            placeholder="Address" />
                        <label class="font-medium text-gray-800">Card Number</label>
                        <input type="text" id="payment-modal-card"
                            class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                            value="1234567890123456"maxlength="16" placeholder="1234 5678 9012 3456" />
                        <div class="flex gap-6">

                            <div class="flex flex-col">
                                <label class="font-medium text-gray-800">Year</label>
                                <input type="text" id="payment-modal-year"
                                    class="w-[55px] outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="2025"
                                    type="number" placeholder="2025" maxlength="4" />
                            </div>
                            <div class="flex flex-col">
                                <label class="font-medium text-gray-800">Month</label>
                                <input type="text" id="payment-modal-month"
                                    class="w-[35px] outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="08"
                                    type="number" placeholder="08" maxlength="2" />
                            </div>

                            <div class="flex flex-col">
                                <label class="font-medium text-gray-800">CVC</label>
                                <input type="text" id="payment-modal-cvc"
                                    class="w-[45px] outline-none rounded bg-gray-100 p-2 mt-2 mb-3" value="123"
                                    type="number" placeholder="123" maxlength="3" />
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-200 px-4 py-3 text-right">
                        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                            onclick="setShowPaymentModal(false)">
                            Cancel
                        </button>
                        <button type="button" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
                            type="submit" onclick="submitPayment()">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <!-- SPINNER -->
    <div id="loader" hidden style="display: none" wire:loading
        class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
        <p class="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
    </div>
    <!-- SPINNER END -->
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