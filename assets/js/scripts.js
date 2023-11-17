const circularProgress = document.querySelectorAll(".circular-progress");

Array.from(circularProgress).forEach((progressBar) => {
  const progressValue = progressBar.querySelector(".percentage");
  const innerCircle = progressBar.querySelector(".inner-circle");
  let startValue = 0,
    endValue = Number(progressBar.getAttribute("data-percentage")),
    speed = 50,
    progressColor = progressBar.getAttribute("data-progress-color");

  const progress = setInterval(() => {
    startValue++;
    progressValue.textContent = `${startValue}%`;
    progressValue.style.color = `${progressColor}`;

    innerCircle.style.backgroundColor = `${progressBar.getAttribute(
      "data-inner-circle-color"
    )}`;

    progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6
      }deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;
    if (startValue === endValue) {
      clearInterval(progress);
    }
  }, speed);
});




// formate date for  
function formatDate(input, type = '') {
  if (input.type == 'date') {
    if (type !== '') {
      input.type = type;
    }
    var enteredDate = input.value;
    if (enteredDate !== '') {
      console.log(enteredDate);
      var parts = enteredDate.split('-');
      console.log(parts);
      var formattedDate = parts[1] + '/' + parts[2].padStart(2, '0') + '/' + parts[0].padStart(2, '0');

      input.value = formattedDate;
      console.log(formattedDate);
    }
  }
  return false;
}



// toggle_flavor button click event 
$(document).on("click", ".al_toggle_flavor", function () {
  $(this).toggleClass("al_active_flavor");
  $('.al_product_wrapper').toggleClass("al_active_info");
  return false;
});



// effectiv product item js 
const effectIcons = {
  0 : 'assets/images/icon/close.png',
  1 : 'assets/images/icon/important/Red Progress.png',
  2 : "assets/images/icon/important/Yellow Progress.png",
  3 : 'assets/images/icon/important/Orange progress.png',
  4 : 'assets/images/icon/important/Green progress.png',
}
let getCanvas;
let clickedItem;
$(document).on("click", ".al_effect_single_product", function () {
   clickedItem = this;
  const effectName = $(clickedItem).find('.effect_name').text();
  $('#al_show_effect_name').text(effectName);
  getCanvas = $('#offcanvasBottom').offcanvas('show');
  const exclueBtn = $(getCanvas.find('.effect_exclude'));
  const doneBtn = $(getCanvas.find('.effect_done'));
  // exclude button click 
  $(exclueBtn).click(function () {
    $(clickedItem).attr("data-effect-value", 0);
    $(clickedItem).find(".al_effect_icon").attr('src', effectIcons[0]);
    $(clickedItem).find("input").val(0)
    $('#offcanvasBottom').offcanvas('hide');
  });
  // done button click 
  $(doneBtn).click(function () {
    var selectedValue = $('input[name="eft_option"]:checked').val();
    $(clickedItem).attr("data-effect-value", selectedValue);
    $(clickedItem).find("input").val(selectedValue);
    $(clickedItem).find(".al_effect_icon").attr('src', effectIcons[selectedValue]);
    $('#offcanvasBottom').offcanvas('hide');
  })
});

const offcanvasBottom = document.getElementById('offcanvasBottom');
if (offcanvasBottom) {
  offcanvasBottom.addEventListener('hidden.bs.offcanvas', event => {
    $('#al_show_effect_name').text('');
    $('input[name="eft_option"]').prop('checked', false);
    getCanvas = null;
    clickedItem = null;
  });
}
