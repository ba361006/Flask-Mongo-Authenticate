import { all, AllEffect, ForkEffect } from 'redux-saga/effects'
import { initializeWorkItemsSaga } from './workItems'

type TRootSaga = Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
>
export default function* rootSaga(): TRootSaga {
  yield all([initializeWorkItemsSaga()])
}
