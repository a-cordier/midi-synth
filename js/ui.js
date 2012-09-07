var synthBox = null;

function createKnob( id, label, width, x, y, min, max, currentValue, color, onChange ) {
	var container = document.createElement( "div" );
	container.className = "knobContainer";
	container.style.left = "" + x + "px";
	container.style.top = "" + y + "px";

	var knob = document.createElement( "input" );
	knob.className = "knob";
	knob.id = id;
	knob.value = currentValue;
	if (label == "detune")
		knob.setAttribute( "data-cursor", true );
	knob.setAttribute( "data-min", min );
	knob.setAttribute( "data-max", max );
	knob.setAttribute( "data-width", width );
	knob.setAttribute( "data-angleOffset", "-125" );
	knob.setAttribute( "data-angleArc", "250" );
	knob.setAttribute( "data-fgColor", color );

	container.appendChild( knob );

	var labelText = document.createElement( "div" );
	labelText.className = "knobLabel";
	labelText.style.top = "" + (width* 0.85) + "px";
	labelText.style.width = "" + width + "px";
	labelText.appendChild( document.createTextNode( label ) );

	container.appendChild( labelText );

	$( knob ).knob({ 'change' : onChange });

	return container;
}

function createDropdown( label, x, y, values, selectedIndex, onChange ) {
	var container = document.createElement( "div" );
	container.className = "dropdownContainer";
	container.style.left = "" + x + "px";
	container.style.top = "" + y + "px";

	var labelText = document.createElement( "div" );
	labelText.className = "dropdownLabel";
	labelText.appendChild( document.createTextNode( label ) );
	container.appendChild( labelText );

	var select = document.createElement( "select" );
	select.className = "dropdownSelect"
	for (var i=0; i<values.length; i++)
		select.options[i] = new Option(values[i]);
	select.selectedIndex = selectedIndex;
	select.onchange = onChange;
	container.appendChild( select );

	return container;
}

function createSection( label, x, y, width, height ) {
	var container = document.createElement( "fieldset" );
	container.className = "section";
	container.style.left = "" + x + "px";
	container.style.top = "" + y + "px";
	container.style.width = "" + width + "px";
	container.style.height = "" + height + "px";

	var labelText = document.createElement( "legend" );
	labelText.className = "sectionLabel";
	labelText.appendChild( document.createTextNode( label ) );

	container.appendChild( labelText );
	return container;
}

function setupSynthUI() {
	synthBox = document.getElementById("synthbox");
	
	var mod = createSection( "mod", 10, 10, 87, 342 );

	// mod is currently unimplemented
	mod.style.borderColor = "#444";
	mod.style.color = "gray";

	mod.appendChild( createDropdown( "shape", 12, 15, ["sine","square", "saw", "triangle"], 0, null ))
	mod.appendChild( createKnob( "mFreq", "freq*10", 80, 12, 65, 0, 200, 2, "#c10087", null ) );
	mod.appendChild( createKnob( "mDepth1", "osc1 freq", 80, 12, 160, 0, 100, 75, "#c10087", null ) );
	mod.appendChild( createKnob( "mDepth2", "osc2 freq", 80, 12, 255, 0, 100, 75, "#c10087", null ) );
	synthBox.appendChild( mod );

	var osc1 = createSection( "OSC1", 130, 10, 240, 160 );	
	osc1.appendChild( createDropdown( "waveform", 10, 15, ["sine","square", "saw", "triangle"/*, "wavetable"*/], currentOsc1Waveform, onUpdateOsc1Wave ))
	osc1.appendChild( createDropdown( "interval",             160, 15, ["32'","16'", "8'"], currentOsc1Octave, onUpdateOsc1Octave ) );
	osc1.appendChild( createKnob(     "osc1detune", "detune", 100, 10, 65, -1200, 1200, currentOsc1Detune, "blue", onUpdateOsc1Detune ) );
	osc1.appendChild( createKnob(     "osc1mix", "mix",       100, 130, 65, 0, 100, currentOsc1Mix, "blue", onUpdateOsc1Mix ) );
	synthBox.appendChild( osc1 );

	var osc2 = createSection( "OSC2", 130, 192, 240, 160 );	
	osc2.appendChild( createDropdown( "waveform", 10, 15, ["sine","square", "saw", "triangle"/*, "wavetable"*/], currentOsc2Waveform, onUpdateOsc2Wave ))
	osc2.appendChild( createDropdown( "interval", 160, 15, ["16'","8'", "4'"], currentOsc2Octave, onUpdateOsc2Octave ) );
	osc2.appendChild( createKnob( "osc2detune", "detune", 100, 10, 65, -1200, 1200, currentOsc2Detune, "blue", onUpdateOsc2Detune ) );
	osc2.appendChild( createKnob( "osc2mix", "mix", 100, 130, 65, 0, 100, currentOsc2Mix, "blue", onUpdateOsc2Mix ) );
	synthBox.appendChild( osc2 );

	var filter = createSection( "filter", 404, 10, 80, 342 );	
	filter.appendChild( createKnob( "fFreq", "freq", 75, 12, 15, 0, 5000, currentFilterFrequency, "#ffaa00", onUpdateFilterFrequency ) );
	filter.appendChild( createKnob( "fQ", "q",       75, 12, 100, 0, 20, currentFilterQ, "#ffaa00", onUpdateFilterQ ) );
//	filter.appendChild( createKnob( "fMod", "mod",   75, 12, 185, 0, 100, currentFilterMod, "ffaa00", null ) );
	filter.appendChild( createKnob( "fEnv", "env",   75, 12, 270, 0, 100, currentFilterEnv, "#ffaa00", onUpdateFilterEnv ) );
	synthBox.appendChild( filter );

	var filterEnv = createSection( "filter envelope", 518, 10, 355, 98 );	
	filterEnv.appendChild( createKnob( "fA", "attack",  80,   10, 20, 0, 100, currentFilterEnvA, "#bf8f30", onUpdateFilterEnvA ) );
	filterEnv.appendChild( createKnob( "fD", "decay",   80,  100, 20, 0, 100, currentFilterEnvD, "#bf8f30", onUpdateFilterEnvD ) );
	filterEnv.appendChild( createKnob( "fS", "sustain", 80,  190, 20, 0, 100, currentFilterEnvS, "#bf8f30", onUpdateFilterEnvS ) );
	filterEnv.appendChild( createKnob( "fR", "release", 80,  280, 20, 0, 100, currentFilterEnvR, "#bf8f30", onUpdateFilterEnvR ) );
	synthBox.appendChild( filterEnv );

	var volumeEnv = createSection( "volume envelope", 518, 131, 355, 98 );	
	volumeEnv.appendChild( createKnob( "vA", "attack",  80,   10, 20, 0, 100, currentEnvA, "#00b358", onUpdateEnvA ) );
	volumeEnv.appendChild( createKnob( "vD", "decay",   80,  100, 20, 0, 100, currentEnvD, "#00b358", onUpdateEnvD ) );
	volumeEnv.appendChild( createKnob( "vS", "sustain", 80,  190, 20, 0, 100, currentEnvS, "#00b358", onUpdateEnvS ) );
	volumeEnv.appendChild( createKnob( "vR", "release", 80,  280, 20, 0, 100, currentEnvR, "#00b358", onUpdateEnvR ) );
	synthBox.appendChild( volumeEnv );

	var master = createSection( "master", 518, 254, 355, 98 );	
	master.appendChild( createKnob( "drive", "drive",    80,   10, 20, 0, 100, currentDrive, "yellow", onUpdateDrive ) );
	master.appendChild( createKnob( "rev", "reverb",     80,  100, 20, 0, 100, currentRev, "yellow", null ) );
	master.appendChild( createKnob( "vol", "volume",     80,  190, 20, 0, 100, currentVol, "yellow", null ) );
	master.appendChild( createDropdown( "midi_in", 280, 15, ["-none-","-", "-"], 0, null ) );
	master.appendChild( createDropdown( "kbd_oct", 280, 60, ["-3", "-2","-1", "normal", "+1", "+2", "+3"], 3, null ) );
	synthBox.appendChild( master );

} 
