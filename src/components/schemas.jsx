import { z } from "zod";

export const personalInfoSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    last_name: z.string().min(1, 'El apellido es obligatorio'),
    dni: z.string().min(1, 'La cédula es obligatoria').regex(/^\d+$/, 'La cédula debe contener solo números'),
    rif: z.string().min(1, 'El RIF es obligatorio').regex(/^[JVGPE][0-9]{8}[0-9]$/, 'El RIF debe ser válido'),
    phone: z.string().min(1, 'El teléfono es obligatorio').regex(/^\d+$/, 'El teléfono debe contener solo números'),
    email: z.string().email('El email debe ser válido'),
    gender: z.enum(['male', 'female'], 'Debes seleccionar un género'),
    fb: z.string().optional(),
    ig: z.string().optional(),
    tt: z.string().optional(),
});

export const personalInfoPymeSchema = z.object({
    business_name: z.string().min(1, 'El nombre es oblihatorio'),
    business_rif: z.string().min(1, 'El RIF es obligatorio').regex(/^[JVGPE][0-9]{8}[0-9]$/, 'El RIF debe ser válido'),
    business_type: z.enum(['pyme', 'corporative'], 'Debes seleccionar un género'),
    legal_name: z.string().min(1, 'El nombre es obligatorio'),
    legal_last_name: z.string().min(1, 'El apellido es obligatorio'),
    legal_dni: z.string().min(1, 'La cédula es obligatoria').regex(/^\d+$/, 'La cédula debe contener solo números'),
    legal_rif: z.string().min(1, 'El RIF es obligatorio').regex(/^[JVGPE][0-9]{8}[0-9]$/, 'El RIF debe ser válido'),
    business_phone: z.string().min(1, 'El teléfono es obligatorio').regex(/^\d+$/, 'El teléfono debe contener solo números'),
    business_email: z.string().email('El email debe ser válido'),
    business_fb: z.string().optional(),
    business_ig: z.string().optional(),
    business_tt: z.string().optional(),
})

export const locationFormSchema = z.object({
    selectedState: z.number().min(1, 'Debes seleccionar un estado'),
    municipality: z.number().min(1, 'Debes seleccionar un municipio'),
    parish: z.number().min(1, 'Debes seleccionar una parroquia'),
    neighborhood: z.number().min(1, 'Debes seleccionar un sector'),
    type_house: z.number().min(1, 'Debes seleccionar un tipo de residencia'),
    vendor: z.number().min(1, 'Debes seleccionar un vendedor'),
    address_r: z.string().min(1, 'La dirección de residencia es obligatoria'),
    address_b: z.string().optional()
})

export const locationFormPymeSchema = z.object({
    selectedState: z.number().min(1, 'Debes seleccionar un estado'),
    municipality: z.number().min(1, 'Debes seleccionar un municipio'),
    parish: z.number().min(1, 'Debes seleccionar una parroquia'),
    neighborhood: z.number().min(1, 'Debes seleccionar un sector'),
    type_house: z.number().min(1, 'Debes seleccionar un tipo de residencia'),
    vendor: z.number().min(1, 'Debes seleccionar un vendedor'),
    address_r: z.string().min(1, 'La dirección de residencia es obligatoria'),
    address_b: z.string().optional()
})

export const plansSelectorSchema = z.object({
    plan: z.number().min(1, 'Debes seleccionar un plan'),
});

export const plansSelectorPymeSchema = z.object({
    plan: z.number().min(1, 'Debes seleccionar un plan'),
});