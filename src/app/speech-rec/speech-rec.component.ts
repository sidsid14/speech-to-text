import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as speech from '@tensorflow-models/speech-commands';

@Component({
  selector: 'app-speech-rec',
  templateUrl: './speech-rec.component.html',
  styleUrls: ['./speech-rec.component.scss'],
})
export class SpeechRecComponent implements OnInit {
  prediction: { score: number; word: string; timestamp: number } = {
    score: 0,
    word: '',
    timestamp: 0,
  };
  recognizer!: speech.SpeechCommandRecognizer;
  words!: string[];

  ngOnInit(): void {
    console.log(tf.engine().backend);
  }

  async loadModel() {
    try {
      this.recognizer = await speech.create('BROWSER_FFT');
      console.log('Model Loaded');
      await this.recognizer.ensureModelLoaded();
      this.words = this.recognizer.wordLabels();
      console.log(this.words);
      this.recognizer.listen(
        async (result: any) => {
          this.getPrediction(result);
        },
        { probabilityThreshold: 0.9 }
      );
    } catch (e) {
      await this.terminateRecognizer();
      throw e;
    }
  }

  getPrediction(result: any) {
    const scores = Array.from(result.scores).map((s, i) => ({
      score: s,
      word: this.words[i],
    })) as { score: number; word: string }[];

    scores.sort((s1, s2) => s2.score - s1.score);
    const predictionWithMaxProb = scores.splice(0, 1)[0];

    this.prediction.word = predictionWithMaxProb.word;
    this.prediction = {
      word: predictionWithMaxProb.word,
      score: predictionWithMaxProb.score,
      timestamp: new Date().getTime(),
    };
  }

  async terminateRecognizer() {
    await this.recognizer.stopListening();
    this.prediction = { score: 0, word: '', timestamp: 0 };
  }
}
