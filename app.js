'use strict';

$(() => {
  let model = {
    // define cat names
    catList: [
      'bubbly',
      'chewie',
      'kathy',
      'lyza',
      'xuca'
    ],
    catClicksCount: {},
    // initalizer for clicks on each cat
    init: () => {
      for (const cat of model.catList) {
        model.catClicksCount[cat] = 0;
      }
    }
  };

  let listView = {
    // select DOM elements to work with
    menu: $('.cat-menu'),
    init: () => {
      listView.render();
      listView.handleClicks();
    },
    // handle clicks on cat names
    handleClicks: () => {
      listView.menu.click((event) => {
        const TARGET = event.target.dataset.cat;
        if (TARGET) {
          // render cat in display area upon cat name being clicked
          octopus.displayCat = TARGET;
          octopus.renderCat();
        } else {
          return;
        }
      });
    },
    // render cat list
    render: () => {
      // obtain cat list from octopus
      const catList = octopus.getCatList();
      for (const cat of catList) {
        listView.menu.append(`<li class=\"cat-name\" data-cat=\"${cat}\">${octopus.capitlizeCatName(cat)}</li>`);
      }
    }
  };

  let catView = {
    catContainer: $('.cat-container'),
    clicks: $('.cat-clicks'),
    catDisplayName: $('.cat-display-name'),
    init: () => {
      catView.render();
      catView.handleClicks();
    },
    handleClicks: () => {
      catView.catContainer.click((event) => {
        const TARGET = event.target.id, capsName = octopus.capitlizeCatName(TARGET);
        if (TARGET) {
          catView.clicks.text('');
          // increment cat clicks
          octopus.incrementCatClicks(TARGET);
          catView.clicks.text(`${capsName} clicks: ${octopus.getCatClicks(TARGET)}`);
        } else {
          return;
        }
      });
    },
    render: () => {
      const cat = octopus.displayCat, capsName = octopus.capitlizeCatName(cat);
      catView.clicks.text(`${capsName} clicks: ${octopus.getCatClicks(cat)}`);
      catView.catDisplayName.text('');
      catView.catDisplayName.text(capsName);
      catView.catContainer.html(`<img class="cat-display-img" id=\"${cat}\" src=\"${cat}.jpg\" alt=\"${cat} on display!\">`);
    }
  };

  let octopus = {
    displayCat: model.catList[0],
    capitlizeCatName: (name) => {
      return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    },
    getCatList: () => {
      return model.catList;
    },
    getCatClicks: (cat) => {
      return model.catClicksCount[cat];
    },
    updateCatClicks: (cat, clicks) => {
      // update model
      model.catClicksCount[cat] = clicks;
    },
    incrementCatClicks: (cat) => {
      let clickCounter = octopus.getCatClicks(cat);
      clickCounter++;
      octopus.updateCatClicks(cat, clickCounter);
    },
    renderCat: () => {
      catView.render();
    },
    init: () => {
      model.init();
      listView.init();
      catView.init();
    }
  };

  octopus.init();
});
