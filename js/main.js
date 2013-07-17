document.addEventListener('DOMComponentsLoaded', function () {
  xtag.addEvent(document, 'prevmonth:delegate(x-calendar)', function (e) {
    console.log('prevmonth detected on', this);
  });

  xtag.addEvent(document, 'nextmonth:delegate(x-calendar)', function (e) {
    console.log('nextmonth detected on', this);
  });

  xtag.addEvent(document, 'datetap:delegate(x-calendar)', function (e) {
    console.log('datetap detected on', this);
  });

  var dateInfo = {};
  var currIso;

  eventsCal.customRenderFn = function (dayEl, date, isoStr) {
    if (isoStr === currIso) {
      xtag.addClass(dayEl, 'current');
    } else {
      xtag.removeClass(dayEl, 'current');
    }

    if (isoStr in dateInfo) {
      dayEl.setAttribute('has-info', true);
    } else {
      dayEl.removeAttribute('has-info');
    }
  }

  // aliases for DOM manipulation
  var eventsDemoStage = document.getElementById('custom-events-demo');
  var eventsCal = eventsDemoStage.querySelector('x-calendar');
  var eventsDateHeader = document.getElementById('custom-events-date');
  var eventsInfo = document.getElementById('custom-events-info');
  var eventsSaveButton = document.getElementById('custom-events-save');

  // respond to calendar taps
  xtag.addEvent(eventsCal, 'datetap', function (e) {
    alert('got here')
    var date = e.detail.date;
    var dateStr = e.detail.iso;
    var content = (dateStr && dateStr in DATE_INFO) ? DATE_INFO[dateStr] : '';
    console.log(dateStr)
    eventsInfo.value = content;
    eventsInfo.disabled = !dateStr;
    eventsSaveButton.disabled = !dateStr;
    currIso = dateStr;
    eventsDateHeader.textContent = (dateStr) ? dateStr : 'None';
    eventsCal.toggleDateOn(date);
    eventsCal.render();
  });

  xtag.addEvent(eventsSaveButton, 'click', function (e) {
    if (currIso) {
      DATE_INFO[currIso] = eventsInfo.value;
    }
    eventsCal.render();
  });

}, false);
