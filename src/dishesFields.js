const dishesFieldsBase = [
  'name',
  'preparation_time',
  'type'
];

const dishesFieldsType = {
  '': [],
  'pizza': [
    'no_of_slices',
    'diameter',
  ],
  'soup': [
    'spiciness_scale',
  ],
  'sandwich': [
    'slices_of_bread',
  ],
}

function dishesFields(type, items = null){
  let fields = dishesFieldsBase;
  if (!!type) fields = [...fields, ...dishesFieldsType[type]]
  if(!!items) return Object.keys(items).reduce((its, i) => {
      if(fields.includes(i)) its[i] = items[i];
      return its;
    },{});
  else return fields;
}
export default dishesFields;