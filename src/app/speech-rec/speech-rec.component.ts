import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';

@Component({
  selector: 'app-speech-rec',
  templateUrl: './speech-rec.component.html',
  styleUrls: ['./speech-rec.component.scss'],
})
export class SpeechRecComponent implements OnInit {
  ngOnInit(): void {
    console.log(tf.engine().backend);
    this.loadModel();
  }

  async loadModel() {
    const recognizer = await speech.create('BROWSER_FFT');
    console.log('Model Loaded');
    await recognizer.ensureModelLoaded();
    console.log(recognizer.wordLabels());
  }
}
