import { call, CallEffect, ForkEffect, takeEvery } from 'redux-saga/effects'
import { todoAction } from './redux'

type TWorkItemsSaga = Generator<CallEffect<void>, void, unknown>
export function* todoSaga(): TWorkItemsSaga {
  // do some saga magic
  yield call(console.log, 'Inside todo saga')
}

type TInitializeWorkItemsSaga = Generator<ForkEffect<never>, void, unknown>
export function* initializeWorkItemsSaga(): TInitializeWorkItemsSaga {
  yield takeEvery(todoAction, todoSaga)
}
