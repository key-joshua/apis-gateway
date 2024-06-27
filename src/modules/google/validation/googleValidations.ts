import Joi from 'joi'

const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'email should be a type of text',
    'string.email': 'email must be a valid email',
    'string.empty': 'email cannot be an empty field',
    'any.required': 'email is required'
}),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$')).required().messages({
      'string.base': 'password should be a type of text',
      'string.empty': 'password cannot be an empty field',
      'string.min': 'password should have a minimum length of 8',
      'string.pattern.base': 'password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'password is required'
  }),
})

const codeSchema = Joi.object({
  code: Joi.string().required().messages({
    'string.base': 'code must be a string',
    'any.required': 'code is required',
  })
})

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'string.base': 'refreshToken must be a string',
    'any.required': 'refreshToken is required',
  })
})

const shareSchema = Joi.object({
  event_type: Joi.string().required().messages({
    'string.base': 'event_type must be a string',
    'any.required': 'event_type is required',
  })
})

const createOneOffEventsSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name must be a string and is calendar name',
    'any.required': 'name is required and is calendar name',
  }),
  host: Joi.string().required().messages({
    'string.base': 'host must be a string and is user uri',
    'any.required': 'host is required and is user uri',
  }),
  co_hosts: Joi.array().min(1).items(Joi.string()).required()
  .messages({
    'any.required': 'co_hosts is required and is users uri',
    'string.empty': 'co_hosts is not allowed to be empty and is users uri',
  }),
  duration: Joi.number().required().min(15).max(720).messages({
    'any.required': 'duration is required',
    'number.empty': 'duration is not allowed to be empty',
  }),
  timezone: Joi.string().required().messages({
    'string.base': 'timezone must be a string',
    'any.required': 'timezone is required',
  }),
  date_setting: Joi.object().required().keys({
    type: Joi.string().required().valid('date_range').messages({
      'string.base': 'type must be a string',
      'any.required': 'type is required',
    }),
    start_date: Joi.date().required().messages({
      'date.base': 'start_date must be a valid date',
    }),
    end_date: Joi.date().required().messages({
      'date.base': 'end_date must be a valid date',
    }),
  }),
  location: Joi.object().required().keys({
    kind: Joi.string().required().valid('google_conference', 'zoom_conference', 'microsoft_teams_conference').messages({
      'string.base': 'kind must be a string',
      'any.required': 'kind is required',
    })
  })
})

const createEventShareSchema = Joi.object({
  event_type: Joi.string().required().messages({
    'string.base': 'event_type must be a string and is event type uri',
    'any.required': 'event_type is required and is event type uri',
  }),
  name: Joi.string().required().messages({
    'string.base': 'name must be a string and is calendar name',
    'any.required': 'name is required and is calendar name',
  }),
  duration: Joi.number().required().min(15).max(720).messages({
    'any.required': 'duration is required',
    'number.empty': 'duration is not allowed to be empty',
  }),
  period_type: Joi.string().required().valid('available_moving', 'moving', 'fixed', 'unlimited').messages({
    'string.base': 'period_type must be a string',
    'any.required': 'period_type is required',
  }),
  start_date: Joi.date().required().messages({
    'date.base': 'start_date must be a valid date of created event type start_date',
  }),
  end_date: Joi.date().required().messages({
    'date.base': 'end_date must be a valid date of created event type end_date',
  }),
  max_booking_time: Joi.number().when('period_type', {
    is: Joi.string().valid('available_moving', 'moving'),
    then:  Joi.number().required().min(15).max(300),
    otherwise: Joi.forbidden()
  }).optional(),
  hide_location: Joi.boolean().default(false).required(),
  location_configurations: Joi.array().required().items(
    Joi.object().keys({
      position: Joi.number().integer().default(0),
      kind: Joi.string().required().valid('google_conference', 'zoom_conference', 'microsoft_teams_conference', 'physical').messages({
        'string.base': 'kind must be a string',
        'any.required': 'kind is required',
      }),
      location: Joi.when('kind', {
        is: 'physical',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
      }),
      additional_info: Joi.when('kind', {
        is: 'physical',
        then: Joi.string().required(),
        otherwise: Joi.forbidden()
      })
    })
  ),
  availability_rule: Joi.object().required().keys({
    rules: Joi.array().required().items(
      Joi.object().keys({
        type: Joi.string().valid('date', 'wday').required(),
        date: Joi.when('type', {
          is: 'date',
          then: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
          otherwise: Joi.optional()
        }),
        wday: Joi.when('type', {
          is: 'wday',
          then: Joi.string().valid('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday').required(),
          otherwise: Joi.optional()
        }),
        intervals: Joi.array().items(
          Joi.object({
            from: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
            to: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required()
          })
        ).required()
      })
    ),
    timezone: Joi.string().required().messages({
      'string.base': 'timezone must be a string',
      'any.required': 'timezone is required',
    }),
  })
})

const getEventsTypesSchema = Joi.object({
  user: Joi.string().messages({
    'string.base': 'organization must be a string  and is user uri',
    'any.required': 'organization is required  and is user uri',
  }),
  organization: Joi.string().messages({
    'string.base': 'user must be a string and is user current_organization',
    'any.required': 'user is required and is user current_organization',
  })
}).or('user', 'organization').messages({ 'object.missing': 'Query param must contain at least one of [user, organization]' })

const getScheduledEventsSchema = Joi.object({
  user: Joi.string().messages({
    'string.base': 'organization must be a string  and is user uri',
    'any.required': 'organization is required  and is user uri',
  }),
  organization: Joi.string().messages({
    'string.base': 'user must be a string and is user current_organization',
    'any.required': 'user is required and is user current_organization',
  }), 
  count: Joi.number().required().min(10).max(20),
  min_start_time: Joi.string().required().messages({
    'string.base': 'min_start_time must be a string',
    'any.required': 'min_start_time is required',
  }),
  max_start_time: Joi.string().messages({
    'string.base': 'max_start_time must be a string',
    'any.required': 'max_start_time is required',
  }),
  status: Joi.string().messages({
    'string.base': 'status must be a string',
    'any.required': 'status is required',
  })
}).or('user', 'organization').messages({ 'object.missing': 'Query param must contain at least one of [user, organization]' })

const getEventSchema = Joi.object({
  eventId: Joi.string().required().messages({
    'string.base': 'eventId must be a string',
    'any.required': 'eventId is required',
  })
})

export { signinSchema, codeSchema, refreshTokenSchema, shareSchema, createOneOffEventsSchema, createEventShareSchema, getEventsTypesSchema, getScheduledEventsSchema, getEventSchema }
