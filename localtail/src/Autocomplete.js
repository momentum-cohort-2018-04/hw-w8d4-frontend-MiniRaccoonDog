import React, {Component} from 'react'
import Downshift from 'downshift'
import { Label, Input } from 'bloomer'
import PropTypes from 'prop-types'

class Autocomplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
      zipcode: ''
    }
  }

  render () {
    const items = [{value: ' '}, {value: '27701'}, {value: '27709'}, {value: '27715'}, {value: '27704'}, {value: '27705'}, {value: '27703'}, {value: '27712'}, {value: '27514'}, {value: '27517'}, {value: '27617'}, {value: '27515'}, {value: '27613'}, {value: '27572'}, {value: '27522'}, {value: '27513'}, {value: '27614'}, {value: '27612'}, {value: '27518'}, {value: '27511'}, {value: '27512'}, {value: '27615'}, {value: '27609'}, {value: '27502'}]
    return (
      <Downshift
        onChange={selection => this.props.getZip(selection.value)}
        itemToString={item => (item ? item.value : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div>
            <Label {...getLabelProps('Zipcode')}>Zipcode</Label>
            <Input name='zipcode' {...getInputProps()} placeholder='Enter Zipcode' />
            {isOpen ? (
              <div>
                {items
                  .filter(item => !inputValue || item.value.includes(inputValue))
                  .map((item, index) => (
                    <div
                      {...getItemProps({
                        key: item.value,
                        index,
                        item,
                        style: {
                          backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'}
                      })}
                    >
                      {item.value}
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    )
  }
}

export default Autocomplete

Autocomplete.propTypes = {
  getZip: PropTypes.func.isRequired
}
