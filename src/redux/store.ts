import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import rootSaga from './rootSaga'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { workItemsReducer } from './workItems'

const sagaMiddleware: SagaMiddleware = createSagaMiddleware()

const store: EnhancedStore = configureStore({
  reducer: workItemsReducer,
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
