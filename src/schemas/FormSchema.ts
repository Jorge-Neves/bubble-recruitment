import * as yup from 'yup';
import FormValidation from '../utils/FormValidation';

const formSchema = yup.object({
  email: yup.string().email().required(FormValidation.getRequiredFieldMsg),
  firstName: yup.string().required(FormValidation.getRequiredFieldMsg),
  lastName: yup.string().required(FormValidation.getRequiredFieldMsg),
  phone: yup.string().required(FormValidation.getRequiredFieldMsg),
  degree: yup.string().required(FormValidation.getRequiredFieldMsg),
  year: yup.string().required(FormValidation.getRequiredFieldMsg),
  area: yup.string().required(FormValidation.getRequiredFieldMsg),
  interests: yup.string().required(FormValidation.getRequiredFieldMsg),
  availableFor: yup.string().required(FormValidation.getRequiredFieldMsg),
  notes: yup.string(),
});

export default formSchema;
