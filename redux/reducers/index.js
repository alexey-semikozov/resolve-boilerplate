import { createReducer } from 'resolve-redux';
import projections from '../../projections';

const { name, eventHandlers } = projections[0];

export default createReducer({ name, eventHandlers });
