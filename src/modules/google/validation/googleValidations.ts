import Joi from 'joi'

const postGoogleEventSchema = Joi.object({
  attendees: Joi.array().required().items(
    Joi.object().required().keys({
      email: Joi.string().email().required().messages({
        'string.empty': 'email cannot be an empty field',
        'string.base': 'email should be a type of text',
        'string.email': 'email must be a valid email',
        'any.required': 'email is required'
      }),
    })
  ),
  description: Joi.string().required().messages({
    'string.base': 'description must be a string and is description of the event',
    'any.required': 'description is required and is description of the event',
  }),
  summary: Joi.string().required().messages({
    'string.base': 'summary must be a string and is summary of the event',
    'any.required': 'summary is required and is summary of the event',
  }),
  start: Joi.object().required().keys({
    dateTime: Joi.date().required().messages({
      'date.base': 'dateTime must be a valid date of created event dateTime, ex: 2020-01-01T10:00:00',
    }),
    timeZone: Joi.string().required().messages({
      'string.base': 'timezone must be a string',
      'any.required': 'timezone is required, ex: Africa/Johannesburg',
    }),
  }),
  end: Joi.object().required().keys({
    dateTime: Joi.date().required().messages({
      'date.base': 'dateTime must be a valid date of created event dateTime, ex: 2020-01-01T10:30:00',
    }),
    timeZone: Joi.string().required().messages({
      'string.base': 'timezone must be a string',
      'any.required': 'timezone is required, ex: Africa/Johannesburg',
    }),
  }),
  conferenceData: Joi.object().required().keys({
    createRequest: Joi.object().required().keys({
      eventName: Joi.string().required().messages({
        'string.base': 'eventName must be a string and is meeting name',
        'any.required': 'eventName is required and is meeting name',
      }),
      conferenceSolutionKey: Joi.object().required().keys({
        type: Joi.string().required().valid('hangoutsMeet').messages({
          'string.base': 'type must be a string, ex: hangoutsMeet',
          'any.required': 'type is required, ex: hangoutsMeet',
        }),
      })
    }),
  }),
})

const getGoogleCalendarSearchSchema = Joi.object({
  calendarId: Joi.string().required().valid('primary').messages({
    'string.base': 'calendarId must be a string',
    'any.required': 'calendarId is required',
  }),
  singleEvents: Joi.boolean().default(false).required(),
  maxResults: Joi.number().required().min(5).max(50).messages({
    'any.required': 'maxResults is required',
    'number.empty': 'maxResults is not allowed to be empty',
  }),
  timezone: Joi.string().required().messages({
    'string.base': 'timezone must be a string, ex: Africa/Johannesburg',
    'any.required': 'timezone is required, ex: Africa/Johannesburg',
  }),
  timeMin: Joi.date().required().messages({
    'date.base': 'timeMin must be a valid date which is start date, ex: 2020-01-01T10:00:00',
  }),
  timeMax: Joi.date().required().messages({
    'date.base': 'timeMax must be a valid date which is end date, ex: 2020-01-01T10:00:00',
  }),
})

export { postGoogleEventSchema, getGoogleCalendarSearchSchema }
