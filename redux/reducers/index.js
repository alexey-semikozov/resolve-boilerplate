import { createReducer } from 'resolve-redux';
import projection from '../../projections';

const { name, eventHandlers } = projection;

export default createReducer({ name, eventHandlers });
