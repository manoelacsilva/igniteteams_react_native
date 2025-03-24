import { useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { groupsGetAll } from '@storage/group/groupsGetAll'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'

import { Container } from './styles'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups(){
    try {
      const data = await groupsGetAll()
      setGroups(data)

    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    // console.log('useFocusEffect executou')
    fetchGroups()
  }, []))    

  return (
    <Container>
      <Header />
      <Highlight
        title="Turmas"
        subtitle='jogue com a sua turma'
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Que tal cadastrar a primeira turma?' 
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  )
}
