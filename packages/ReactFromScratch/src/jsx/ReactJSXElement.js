import hasOwnProperty from "../../../shared/hasOwnProperty";

export function createElement(type, config, children) {
  let propName;

  const props = {};

  let key = null;

  if ("key" in config) {
    if (hasOwnProperty.call(config, "key")) {
      key = "" + config.key;
    }
  }

  for (propName in config) {
    if (
      hasOwnProperty.call(config, propName) &&
      // Skip over reserved prop names
      propName !== "key" &&
      // Even though we don't use these anymore in the runtime, we don't want
      // them to appear as props, so in createElement we filter them out.
      // We don't have to do this in the jsx() runtime because the jsx()
      // transform never passed these as props; it used separate arguments.
      propName !== "__self" &&
      propName !== "__source"
    ) {
      props[propName] = config[propName];
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return {
    type,
    key,
    props,
  };
}
