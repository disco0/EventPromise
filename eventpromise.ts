﻿/*
The MIT License(MIT)

Copyright(c) 2014 SaschaNaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files(the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and / or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

///<reference path="contract.ts" />

module EventPromise {
  export function waitEvent<T extends Event>(target: EventTarget, eventName: string) {
    let eventListener: (evt: T) => void;
    return new Contract<T>(
      (resolve, reject) => {
        eventListener = (evt: T) => resolve(evt);
        target.addEventListener(eventName, eventListener);
      }, {
        revert: () => target.removeEventListener(eventName, eventListener)
      });
  }

  export function subscribeEvent<T extends Event>(target: EventTarget, eventName: string, listener: (evt: T, contract: Contract<any>) => any) {
    let eventListener = (evt: T) => listener.call(target, evt, contract);
    var contract = new Contract<T>(
      (resolve, reject) => {
        target.addEventListener(eventName, eventListener);
      }, {
        revert: () => target.removeEventListener(eventName, eventListener)
      });
    return contract;
  }
  // TODO: Reimplement waitEvent and subscribeEvent using Contract
}
//new Contract<number>({ init: (resolve, reject) => { }, revert: () => { } });
