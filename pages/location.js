import React from 'react'
import ReactMarkdown from 'react-markdown'

import files from '../content/output/files.json'

const images =
files.children
.filter(dir => dir.name === 'images')[0].children
.filter(dir => dir.name === 'space')[0].children
.map(file => file.path)

class Location extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div id="location" className="category">
        <h1 className="ui horizontal divider header">
          <i className="map outline icon"></i>
          Location
        </h1>
        <div id="map" className="ui grid">
          <div className="ten wide column">
            <div className="feature map">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2506.544200524445!2d-114.1279042!3d51.079963549999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f0c07993c17%3A0xb8f1352e9e5dfa06!2sMath+Science%2C+Calgary%2C+AB+T2N+4V8%2C+Canada!5e0!3m2!1sen!2sus!4v1439359680603" frameBorder="0" style={{ border :0 }}></iframe>
            </div>
          </div>
          <div className="six wide column">
            <div className="ui segment">
              <h1>Interactions Lab</h1>
              <p>
                680 Math Science Building,<br/>
                University of Calgary<br/>
                Calgary, AB T2N 4V8, Canada
              </p>
            </div>
          </div>
        </div>
        { !this.props.short &&
          <div id="space" className="category">
            <h1 className="ui horizontal divider header">
              <i className="map outline icon"></i>
              Space
            </h1>
            test with example photos
            <div className="ui four cards" style={{ marginTop: '30px' }}>
              { images.map((src) => {
                return (
                  <a className="card" href={ `/${src}` } target="_blank">
                    <div className="image">
                      <img src={ `/${src}` }/>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        }
        { this.props.short &&
          <div className="ui vertical segment stackable" style={{ textAlign: 'center' }}>
            <a className="ui button" href="/location">
              + learn more about our space
            </a>
          </div>
        }

      </div>
    )
  }
}

export default Location
