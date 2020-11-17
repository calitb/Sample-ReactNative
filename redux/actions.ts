interface IncrementarAction {
  type: 'INCREMENTAR';
}

export function incrementar(): Action {
  return { type: 'INCREMENTAR' };
}

type Action = IncrementarAction;
export default Action;
