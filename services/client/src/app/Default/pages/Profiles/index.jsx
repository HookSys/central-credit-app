import React from 'react'
import PropTypes from 'prop-types'
import { ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import CleanTemplate from 'templates/CleanTemplate'
import { userLogout, userSelectEntity } from 'core/actions/user'
import { useEntity, useCache } from 'hooks'

const { Layout, List, ListContainer, ListItem, ListHeader } = CleanTemplate

const Profiles = ({ entity: { pages } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user.get('data'))
  const modules = useEntity()
  const cache = useCache()

  const onSelectProfile = (entity, entityStructure) => async () => {
    cache.clear()
    await dispatch(userSelectEntity(entity.get('identificador')))
    setTimeout(() => history.push(entityStructure.route))
  }

  const onLogout = async () => {
    await dispatch(userLogout())
    setTimeout(() => history.push(pages.LOGIN))
  }

  const entities = user.get('funcoes')

  if (entities.size === 1) {
    return null
  }
  return (
    <Layout className='profiles'>
      <ListContainer>
        <List>
          <ListHeader>
            Escolha um perfil de acesso:
          </ListHeader>
          {entities.size > 0 ? entities.map((entity) => {
            const structure = modules[entity.get('entidade_tipo')]
            if (!structure) {
              return false
            }

            const { entity: entityStructure } = structure
            return (
              <ListItem
                key={ entity.get('identificador') }
                onClick={ onSelectProfile(entity, entityStructure) }
                className='d-flex flex-row align-items-center py-2'
              >
                <Avatar
                  title={ entity.get('entidade_nome') }
                  icon={ entityStructure.logo.svg }
                  className={ entityStructure.logo.className }
                />
                <div className='ml-3'>
                  <h6 className='pb-0 mb-n1'>{entity.get('entidade_nome')}</h6>
                  <small>{ entityStructure.name }</small>
                </div>
              </ListItem>
            )
          }).filter(Boolean) : (
            <ListItem>
              Você não possui perfis liberados.
            </ListItem>
          ) }
        </List>
        <Button
          onClick={ onLogout }
          className='btn btn-link text-danger d-block ml-auto'
        >
          Sair
          <ExitToApp className='ml-2' />
        </Button>
      </ListContainer>
    </Layout>
  )
}

Profiles.propTypes = {
  entity: PropTypes.object.isRequired,
}

export default Profiles
