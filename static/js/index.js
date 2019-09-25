var currentUrl = ''
var buttons = $('.list-group-item-action')
var loadingGif = $('#loading')
var resultEl = $('#result')
var ulEl = document.createElement('ul')

$('.img-box').click(function (e) {
  const img = $(this).find('img')
  const hasClass = $(this).hasClass('selected')

  // select element
  currentUrl = hasClass ? '' : img[0].currentSrc

  if (hasClass) {
    $(this).removeClass('selected')
  }
  else {
    $('.img-box').removeClass('selected')
    $(this).addClass('selected')
  }
})

function setOption(option) {
  if (currentUrl.length) {

    resultEl.addClass('result-empty')
    loadingGif.show()

    // disable button
    buttons.attr('disabled', true)

    var ajax = new XMLHttpRequest();
    const url = `/setoption?url=${currentUrl}&option=${option}`
    // ajax stuff
    ajax.open("GET", url, true)
    ajax.send()
    ajax.onreadystatechange = function () {

      if (ajax.readyState == 4 && ajax.status == 200) {
        const data = JSON.parse(ajax.responseText)
        const img = document.createElement('img')

        
        if(data.type == 'img') {
          resultEl.removeClass('result-empty')
          img.src = data.result
          img.height = 300
          img.width = 500
          
          resultEl.html(img)
        
        } else if(data.type == 'text') {
          console.log('data', data.result);
          const captions = data.result.output.captions.filter(c => c.confidence > 0.90)
          const resultCaptions = captions.map(r => r.caption)
          ulEl.innerHTML = ''

          resultCaptions.forEach(cap => {
            const li = document.createElement('li')

            li.innerHTML = cap
            ulEl.appendChild(li)
          })
          
          resultEl.html(ulEl)
          
          
        }

        loadingGif.hide()

        // enable buttons
        buttons.attr('disabled', false)

      }
    }
  }

}
