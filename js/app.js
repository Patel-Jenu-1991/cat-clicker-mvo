'use strict';

$(() => {
  let model = {
    // define current cat
    displayCat: null,
    // define cat names
    catList: ['bubbly', 'chewie', 'kathy', 'lyza', 'xuca'],
    // an empty object to hold clicks on each cat
    catClicksCount: {},
    // model initalizer
    init: () => {
      for (const cat of model.catList) {
        // set initial clicks for each cat to 0
        model.catClicksCount[cat] = 0;
      }
    }
  };

  let listView = {
    menu: null,
    // list initalizer
    init: () => {
      // select DOM elements to work with
      listView.menu = $('.cat-menu');
      // render list
      listView.render();
      // handle clicks on list
      listView.handleClicks();
    },
    // handle clicks on cat names
    handleClicks: () => {
      listView.menu.click(event => {
        // detect cat
        const TARGET = event.target.dataset.cat;
        if (TARGET) {
          // set current cat to detected cat
          octopus.setDisplayCat(TARGET);
          // render the target cat
          octopus.renderCat();
        } else {
          // avoid clicks out of context
          return;
        }
      });
    },
    // render cat list
    render: () => {
      // obtain cat list
      const catList = octopus.getCatList();
      // populate and display cat list
      for (const cat of catList) {
        const capsName = octopus.capitlizeCatName(cat);
        listView.menu.append(
          `<li class=\"cat-name\" data-cat=\"${cat}\">${capsName}</li>`
        );
      }
    }
  };

  let catView = {
    catContainer: null,
    clicks: null,
    catDisplayName: null,
    // catView initalizer
    init: () => {
      // obtain DOM elements to work with
      catView.catContainer = $('.cat-container');
      catView.clicks = $('.cat-clicks');
      catView.catDisplayName = $('.cat-display-name');
      catView.render();
      catView.handleClicks();
    },
    // handle clicks on cat images
    handleClicks: () => {
      // delegate events on cat pictures
      catView.catContainer.click(event => {
        // obtain target cat and capitlize it's name
        const TARGET = event.target.id,
          capsName = octopus.capitlizeCatName(TARGET);
        if (TARGET) {
          // clear previous cliks
          catView.clicks.text('');
          // increment clicks per click
          octopus.incrementCatClicks(TARGET);
          const catClicks = octopus.getCatClicks(TARGET);
          // update text showing clicks
          catView.clicks.text(
            `${capsName} clicks: ${catClicks}`
          );
        } else {
          return;
        }
      });
    },
    // render cat to display area
    render: () => {
      // obtain display cat and capitlize it's name
      const cat = octopus.getDisplayCat(),
        capsName = octopus.capitlizeCatName(cat),
        catClicks = octopus.getCatClicks(cat);
      // set initial clicks text
      catView.clicks.text(`${capsName} clicks: ${catClicks}`);
      // clear cat display name
      catView.catDisplayName.text('');
      // display cat name
      catView.catDisplayName.text(capsName);
      // display cat picture
      catView.catContainer.html(
        `<img class="cat-display-img" id=\"${cat}\" src=\"img/${cat}.jpg\" alt=\"${cat} on display!\">`
      );
    }
  };

  let octopus = {
    // function definition to capitlize cat names
    capitlizeCatName: name => {
      return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    },
    // function definition to obtain cat list
    getCatList: () => {
      return model.catList;
    },
    // function definition to retrieve current cat
    getDisplayCat: () => {
      return model.displayCat;
    },
    // function definition to set current cat
    setDisplayCat: cat => {
      model.displayCat = cat;
    },
    // function definition to obtain clicks on a cat
    getCatClicks: cat => {
      return model.catClicksCount[cat];
    },
    // function definition to increment clicks on a cat
    incrementCatClicks: cat => {
      // obtain the existing count of clicks
      let clickCounter = octopus.getCatClicks(cat);
      // increment clicks
      clickCounter++;
      // update model
      model.catClicksCount[cat] = clickCounter;
    },
    // render the cat
    renderCat: () => {
      catView.render();
    },
    // octopus initalizer
    init: () => {
      // set initial current cat
      model.displayCat = model.catList[0];
      // initialize model, listView, catView
      model.init();
      listView.init();
      catView.init();
    }
  };

  // initalize octopus
  octopus.init();
});
