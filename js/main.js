(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
   const loader = document.querySelector("#loader");

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/materials"


    function getData() {
        loader.classList.toggle("hidden");
        fetch("https://swiftpixel.com/earbud/api/materials")
        .then(response => response.json())
        .then(materialList => {
            console.log(materialList);

            const ul = document.createElement("ul");
            ul.id = "material-list";

            materialList.results.forEach(result =>{
                const li = document.createElement("li");

                const h2 = document.createElement("h2");
                h2.textContent = `${result.name.first} ${result.name.last}`;
                // h2.textContent = result.name.first + " " + result.name.last;

                const p = document.createElement("p");
                p.textContent = result.email;

                li.appendChild(h2);
                li.appendChild(p);

                ul.appendChild(li);
            })
            loader.classList.toggle("hidden");
            materialTemplate.appendChild(ul);
        })
        .catch(error=>{
            console.log(error);
            // const errorMessage = document.createElement("p");
            // errorMessage.textContent = "Oops something went wrong. It may be your internet connection or it might be us. Please try again later.";
            // materialTemplate.appendChild(errorMessage);

            materialTemplate.innerHTML = `<p>Oops something went wrong. It may be your internet connection or it might be us. Please try again later.</p>`;
        })
    }

    getData();

  //functions
  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
    })
    .catch(error => {
      //make a meaningful error message and post to DOM
      console.log(error);
    });

   
  }
  loadInfoBoxes();

  function loadMaterialInfo() {

    //Add loader in HTML, write code to show it here

    //make AJAX Call here

     //this is the api url https://swiftpixel.com/earbud/api/materials"


    materialListData.forEach(material => {
      // clone the template li with h3 and p inside
      const clone = materialTemplate.content.cloneNode(true);
      // populate the cloned template
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      //Hide the loader

      //Append the populated template to the list
      materialList.appendChild(clone);
    })
  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

