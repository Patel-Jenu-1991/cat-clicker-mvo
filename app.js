'use strict';

$(() => {
  let model = {
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
    // select DOM elements to work with
    menu: $('.cat-menu'),
    // list initalizer
    init: () => {
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
          // set displayCat to detected cat
          octopus.displayCat = TARGET;
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
        listView.menu.append(
          `<li class=\"cat-name\" data-cat=\"${cat}\">${octopus.capitlizeCatName(
            cat
          )}</li>`
        );
      }
    }
  };

  let catView = {
    // obtain DOM elements to work with
    catContainer: $('.cat-container'),
    clicks: $('.cat-clicks'),
    catDisplayName: $('.cat-display-name'),
    // catView initalizer
    init: () => {
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
          // update text showing clicks
          catView.clicks.text(
            `${capsName} clicks: ${octopus.getCatClicks(TARGET)}`
          );
        } else {
          return;
        }
      });
    },
    // render cat to display area
    render: () => {
      // obtain display cat and capitlize it's name
      const cat = octopus.displayCat,
        capsName = octopus.capitlizeCatName(cat);
      // set initial clicks text
      catView.clicks.text(`${capsName} clicks: ${octopus.getCatClicks(cat)}`);
      // clear cat display name
      catView.catDisplayName.text('');
      // display cat name
      catView.catDisplayName.text(capsName);
      // display cat picture
      catView.catContainer.html(
        `<img class="cat-display-img" id=\"${cat}\" src=\"${cat}.jpg\" alt=\"${cat} on display!\">`
      );
    }
  };

  let octopus = {
    // set initial display cat
    displayCat: model.catList[0],
    // function definition to capitlize cat names
    capitlizeCatName: name => {
      return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    },
    // function definition to obtain cat list
    getCatList: () => {
      return model.catList;
    },
    // function definition to obtain clicks on a cat
    getCatClicks: cat => {
      return model.catClicksCount[cat];
    },
    // function definition to update clicks on a cat
    updateCatClicks: (cat, clicks) => {
      // update model
      model.catClicksCount[cat] = clicks;
    },
    // function definition to increment clicks on a cat
    incrementCatClicks: cat => {
      // obtain the existing count of clicks
      let clickCounter = octopus.getCatClicks(cat);
      // increment clicks
      clickCounter++;
      // update clicks for the cat
      octopus.updateCatClicks(cat, clickCounter);
    },
    // render the cat
    renderCat: () => {
      catView.render();
    },
    // octopus initalizer
    init: () => {
      // initialize model, listView, catView
      model.init();
      listView.init();
      catView.init();
    }
  };

  // initalize octopus
  octopus.init();
});
