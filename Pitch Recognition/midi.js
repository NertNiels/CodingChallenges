function initMidi() {
  navigator.requestMIDIAccess().then(onMidiAccessSuccess, onMidiAccessError);

  console.log("waiting for Midi");

  function onMidiAccessSuccess(access) {
    var inputIterators = access.inputs.values();

    console.log(inputIterators);

    var firstInput = inputIterators.next().value;

    if(!firstInput) {
      console.log("No devices found.")
      return;
    }
    firstInput.onmidimessage = handleMidiMessage;

  }

  function onMidiAccessError(error) {
    console.log("MIDI Error: " + error.code);
  }

  function handleMidiMessage(e) {
    console.log(e);
  }
}
