function createNode(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div.firstChild;
}

function renderNames() {
  characterList.innerHTML = '';
  // query sim for list of characters
  const npcs = Sim.getAllCharacterNames(); 
  for (let i = 0; i < npcs.length; i++) {
    const npc = npcs[i];
    let html = `<div class="character-list">
      <div class="npc"><h4>${npc}</h4></div>
        <ul>
          <li>
            Occupation: ${Sim.getCharacterOccupationByName(npc)}
          </li>
          <li>
            Faction: ${Sim.getCharacterFactionByName(npc)}
          </li>
          <li>
            Status: ${Sim.getCharacterStatusByName(npc)}
          </li>
        </ul>
      </div>`
      const node = createNode(html);
      characterList.appendChild(node);
  }
}

function renderLocations() {
  locationList.innerHTML = '';
  // query sim for list of locations
  const locations = Sim.getAllLocationNames(); 
  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    const NPCArray = Sim.getLocationNPCsByName(location);
    let html = `<div class="location-list">
      <div class="location"><h4>${location}</h4></div>
        <ul>
          <li>
            State: ${Sim.getLocationStateByName(location)}
          </li>
          <li>
            NPCs at location: ${Sim.getLocationNPCsByName(location)}
          </li>
        </ul>
      </div>`
      const node = createNode(html);
      locationList.appendChild(node);
  }
}

function writeToConsole() {
  //Add locations for each of the locations
  const locations = JSON.parse(json_locations);

  for (let i = 0; i < locations.length; i++){ 
   writeLocation(i, locations);
  }
}

function writeLocation(i, locations) {
  // Get location info
  var tag = locations[i].tag;
  var name = locations[i].fields.name;
  var npcs = locations[i].fields.NPCs;
  
  var npc;

  var log = tag + "[" + name + "]";

  if (npcs.length == 0){
      setTimeout (console.log.bind (console, log));
      return;
    }

  // Otherwise there are NPCs at location, add them as connected nodes 
  for (let j = 0; j < npcs.length; j++){
      var log = tag + "[" + name + "]";
      //npc = npcs[j]
      //writeCharacter(npc, locations);
      log = log + "-->" + npcs[j] + "(" + Sim.getCharacterNameByTag(npcs[j])  + ")";
      setTimeout (console.log.bind (console, log));
    }
  }  

//renderNames();
//renderLocations();
writeToConsole();