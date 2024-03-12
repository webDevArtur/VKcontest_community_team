import React, { useState } from 'react';
import { SimpleCell, Button } from '@vkontakte/vkui';
import { Group, avatarColors } from '../../models/Group';

interface Props {
    groups: Group[];
}

const GroupListItem: React.FC<Props> = ({ groups }) => {
    const [selectedFriends, setSelectedFriends] = useState<{ first_name: string; last_name: string }[] | undefined>(undefined);

    const handleShowFriends = (friends: { first_name: string; last_name: string }[] | undefined) => {
        if (friends === selectedFriends) {
            setSelectedFriends(undefined);
        } else {
            setSelectedFriends(friends);
        }
    };

    const getPrivacyType = (closed: boolean) => {
        return closed ? 'Закрытая' : 'Открытая';
    };

    return (
        <div>
            {groups.map(group => (
                <div key={group.id} style={{ backgroundColor: '#F7F7F7', marginBottom: '16px', borderRadius: '8px' }}>
                    <SimpleCell>
                        <div style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }} >
                                <div style={{ width: '40px', height: '40px', marginRight: '8px', borderRadius: '50%', border: '1px solid #ccc', backgroundColor: group.avatar_color ? avatarColors[group.avatar_color] : 'transparent' }}></div>
                                <h2 style={{ marginBottom: '8px', marginTop: 'auto' }}>{group.name}</h2>
                            </div>
                            <div style={{ marginBottom: '4px' }}>Тип приватности: {getPrivacyType(group.closed)}</div>
                            <div style={{ marginBottom: '4px' }}>Количество участников: {group.members_count}</div>
                            {group.friends && group.friends.length > 0 && (
                                <Button style={{ marginTop: '8px' }} onClick={() => handleShowFriends(group.friends)}>
                                    {selectedFriends && selectedFriends === group.friends ? 'Скрыть друзей' : 'Показать друзей'} ({group.friends.length})
                                </Button>
                            )}
                            {selectedFriends && selectedFriends === group.friends && (
                                <div>
                                    {selectedFriends.map((friend, index) => (
                                        <div key={index} style={{ margin: '4px', padding: '4px', fontWeight: 'bold' }}>
                                            {friend.first_name} {friend.last_name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </SimpleCell>
                </div>
            ))}
        </div>
    );
};

export default GroupListItem;