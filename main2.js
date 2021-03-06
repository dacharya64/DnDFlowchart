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

  var log = tag + "[" + name + "]:::locclass";

  if (npcs.length == 0){
     setTimeout (console.log.bind (console, log));
     return;
  } else { // Otherwise there are NPCs at location, add them as connected nodes 
    for (let j = 0; j < npcs.length; j++){
      var log = tag + "[" + name + "]:::locclass"; //need to reset log
      npc = npcs[j]
      writeCharacter(npc, log);
    }
  } 
}

function writeCharacter (npc, log) {
  log = log + "-->" + npc + "{{" + Sim.getCharacterNameByTag(npc)  + "}}:::charclass";
  setTimeout (console.log.bind (console, log));
  
  var info = Sim.getCharacterInfoByTag(npc);
  var infoArr = info.toString().split(',');
  
  // Check if character has any info
  if (infoArr[0] == ""){
    return;
  } else {
    log = npc;
    for (let k = 0; k < infoArr.length; k++){
      var infoPiece = infoArr[k]
      writeIdea(infoPiece, log);
    }
  }
}

function writeIdea (infoPiece, log) {
  log = log + "-->" + infoPiece + "(\"\<p\>" + Sim.getInfoTextByTag(infoPiece)  + "\<\/p\>\"):::infoclass";
  setTimeout (console.log.bind (console, log));

  var locs = Sim.getInfoLocationsByTag(infoPiece); 
  var locArr = locs.toString().split(',');

  // Check if info has any locations
  if (locArr[0] == ""){
    return;
  } else {
    log = infoPiece;
    for (let x = 0; x < locArr.length; x++){
      var loc = locArr[x]
      writeSecondaryLocation(loc, log);
    }
  }
}

function writeSecondaryLocation(loc, log) {
  log = log + "-->" + loc + "[" + Sim.getLocationNameByTag(loc)  + "]:::locclass";
  setTimeout (console.log.bind (console, log));
}

//renderNames();
//renderLocations();
writeToConsole();


//Set it so that each node has line breaks after certain # of words
$("p").each(function() {
  var html = $(this).html().split(" ");
  var slicedHTML = "";
  var i;
  for (i = 0; i <= html.length - 3; i = i + 3) {
    slicedHTML = slicedHTML + html.slice(i, i+3).join(" ") + "<br />";
  }
  slicedHTML = slicedHTML + html.slice(i).join(" ");
  $(this).html(slicedHTML);
});