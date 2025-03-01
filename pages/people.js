import React from 'react'
import ReactMarkdown from 'react-markdown'
import summary from '../content/output/summary.json'

let types = [
  { key: 'faculty', title: 'Faculty' },
  { key: 'postdoc', title: 'Post Docs' },
  { key: 'phd', title: 'PhD Students' },
  { key: 'master', title: 'Masters Students' },
  { key: 'undergrad', title: 'Undergrad Students'},
  { key: 'visiting', title: 'Visiting Researchers' },
  { key: 'alumni', title: 'Alumni' }
]

let fileNames = Object.keys(summary.fileMap)
let keys = fileNames.filter((fileName) => {
  return fileName.includes('people')
})

let people = []
for (let key of keys) {
  let id = key.split('/')[3].replace('.json', '')
  let person = Object.assign(summary.fileMap[key], { id: id })
  people.push(person)
}

class People extends React.Component {
  componentDidMount() {
  }

  getTitle(person) {
    if (person.title) return person
    switch (person.type) {
      case 'postdoc':
        person.title = 'Postdocotral Fellow'
        break
      case 'phd':
        person.title = 'PhD Student'
        break
      case 'master':
        person.title = 'MSc Student'
        break
      case 'undergrad':
        person.title = 'Undergraduate Student'
        break
      case 'visiting':
        person.title = 'Visiting Researcher'
        break
      case 'alumni':
        switch (person.past) {
          case 'postdoc':
            person.title = 'Alumni (PostDoc)'
            break
          case 'phd':
            person.title = 'Alumni (PhD)'
            break
          case 'master':
            person.title = 'Alumni (MSc)'
            break
          case 'undergrad':
            person.title = 'Alumni (Undergrad)'
            break
          case 'visiting':
            person.title = 'Alumni (Visiting)'
            break
        }
        break
    }
    return person
  }

  render() {
    if (this.props.short) {
      types = types.slice(0, 4)
      // types.splice(4, 2)
    }
    return (
      <div id="people" className="category">
        <h1 className="ui horizontal divider header">
          <i className="child icon"></i>
          People
        </h1>
        { types.map((type) => {
          return (
            <div className="people-category" key={ type.title }>
              <h2>{ type.title }</h2>
              <div className="ui grid">
                { people
                  .filter((person) => {
                    return person.type === type.key
                  }) // filter
                  .map((person) => {
                    person = this.getTitle(person)
                    return (
                      <a className="four wide column person" href={ `/people/${ person.id }` } key={ person.id }>
                        <img className="ui circular image medium-profile" src={ `/static/images/people/${ person.id }.jpg`}/>
                        <p><b>{ person.name }</b></p>
                        <p>
                          { person.title }
                          { person.now &&
                            <span><br/>{ person.now }</span>
                          }
                        </p>
                      </a>
                    ) // return
                  }) // map
                }
              </div>
            </div>
          )
        })}
        { this.props.short &&
          <div className="ui vertical segment stackable" style={{ textAlign: 'center' }}>
            <a className="ui button" href="/people">
              + see more members
            </a>
          </div>
        }
      </div>
    )
  }
}

export default People
