import { END, eventChannel } from "@redux-saga/core";
import { call, take } from "@redux-saga/core/effects";
import { createEventProvider } from "../api/event-provider";


const createEventProviderChannel = (eventProvider) => {
  return eventChannel(emit => {

    const valueHandler = (event) => {
      if(event.payload > 5) {
        emit(END)  //* condition for END channel (close channel)
        return
      }
      emit(event.payload)
    }
    eventProvider.subscribe('value', valueHandler)

    return () => {
      eventProvider.unsubscribe('value', valueHandler)
      console.log('%cqqq: unsubscribed', 'color: green;');
    }
  })

}

export function* eventChannelSaga() {
  const eventProvider = yield call(createEventProvider)
  const eventProviderChannel = yield call(createEventProviderChannel, eventProvider)

  try {
    while(true) {
      const payload = yield  take(eventProviderChannel)
      console.log('%cqqq: payload', 'color: green;', payload);
    }

  } 
  catch(err) {
    console.log('%cqqq: ERROR', 'color: green;', err);
  }
  finally  {
    console.log('%cqqq: event channel terminated', 'color: green;');
  }
}