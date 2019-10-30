import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Input } from 'components'

import InputAddonBuilder from './builders/InputAddonBuilder'

const ReduxFormInputBuilder = (displayName = 'ReduxFormInputBuilder') => {
  // Addons to render
  let _leftAddon
  let _rightAddon

  // ClassNames (Form, Label and InputGroup)
  let _classNames

  // Default ClassNames
  const _defaultClassNames = {
    form: ['form-group'],
    label: [],
    input: ['form-control'],
    group: ['input-group'],
  }

  const builder = {
    leftAddon: leftAddon => {
      _leftAddon = leftAddon
      return builder
    },
    rightAddon: rightAddon => {
      _rightAddon = rightAddon
      return builder
    },
    classNames: classNamesFn => {
      _classNames = classNamesFn
      return builder
    },
    build: () => {
      const defaultClassNames = _classNames && typeof _classNames === 'function'
        ? _classNames(_defaultClassNames)
        : _defaultClassNames

      const {
        form: formClassNames,
        label: labelClassNames,
        input: inputClassNames,
        group: groupClassNames,
      } = defaultClassNames

      const InputBuilt = (props) => {
        const {
          id,
          input,
          label,
          type,
          disabled,
          placeholder,
          inputMode,
          className,
          meta: { touched, error },
        } = props

        return (
          <div className={ classNames(...formClassNames) }>
            <label
              htmlFor={ input.name }
              className={ classNames(...labelClassNames, {
                'text-danger': (touched && error),
                'sr-only': !label,
              }) }
            >
              { label }
            </label>

            <div className={ classNames(...groupClassNames) }>
              { _leftAddon && _leftAddon(props) }
              <Input
                type={ type }
                id={ id || input.name }
                disabled={ disabled }
                name={ input.name }
                onChange={ input.onChange }
                onFocus={ input.onFocus }
                onBlur={ input.onBlur }
                value={ input.value }
                placeholder={ placeholder }
                inputMode={ inputMode }
                className={ classNames(...inputClassNames, className, {
                  'is-invalid': (touched && error),
                }) }
              />
              { _rightAddon && _rightAddon(props) }
            </div>

          </div>
        )
      }

      InputBuilt.propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        inputMode: PropTypes.string,
        className: PropTypes.string,
      }
      InputBuilt.defaultProps = {
        input: {},
        meta: {},
        label: '',
        type: 'text',
        placeholder: '',
        disabled: false,
        inputMode: 'text',
        className: '',
      }

      InputBuilt.displayName = displayName

      return InputBuilt
    },
  }

  return builder
}

ReduxFormInputBuilder.InputAddonBuilder = InputAddonBuilder

export default ReduxFormInputBuilder