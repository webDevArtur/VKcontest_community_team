import React, { useState, useEffect, ChangeEvent } from 'react';
import { View, Panel, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Group, GetGroupsResponse, CustomSelectOptionInterface } from '../../models/Group';
import GroupListItem from '../../components/GroupList/GroupListItem.tsx';
import Spinner from '../../components/UI/Spinner/Spinner.tsx';
import Select from '../../components/UI/Select/Select';
import Checkbox from '../../components/UI/Checkbox/Checkbox';
import { SelectChangeEvent } from '@mui/material/Select';
import errorImage from '../../assets/error.png';
import emptyImage from '../../assets/empty.png';
import groupsData from '../../api/groups.json';

const MainPage: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
    const [privacyFilter, setPrivacyFilter] = useState<CustomSelectOptionInterface>({ value: 'all', label: 'Все' });
    const [colorFilter, setColorFilter] = useState<CustomSelectOptionInterface>({ value: 'all', label: 'Любой' });
    const [friendsFilter, setFriendsFilter] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response: GetGroupsResponse = {
                result: Math.floor(Math.random() * 3) === 0 ? 0 : 1,
                data: groupsData
            };

            if (response.result === 1 && response.data) {
                setGroups(response.data);
                setError('');
            } else {
                setError('Произошла ошибка при получении данных');
            }
        } catch (error) {
            setError('Произошла ошибка при получении данных');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = groups.filter(group => {
            if (privacyFilter.value === 'all') {
                return true;
            } else if (privacyFilter.value === 'closed') {
                return group.closed;
            } else {
                return !group.closed;
            }
        });

        if (colorFilter.value !== 'all') {
            filtered = filtered.filter(group => group.avatar_color === colorFilter.value);
        }

        if (friendsFilter) {
            filtered = filtered.filter(group => group.friends && group.friends.length > 0);
        }

        setFilteredGroups(filtered);
    }, [groups, privacyFilter, colorFilter, friendsFilter]);

    const privacyOptions: CustomSelectOptionInterface[] = [
        { value: 'all', label: 'Все' },
        { value: 'closed', label: 'Закрытые' },
        { value: 'open', label: 'Открытые' }
    ];

    const colorOptions: CustomSelectOptionInterface[] = [
        { value: 'all', label: 'Любой' },
        { value: 'red', label: 'Красный' },
        { value: 'blue', label: 'Синий' },
        { value: 'green', label: 'Зеленый' }
    ];

    const handleReload = () => {
        fetchData();
    };

    const handleResetFilters = () => {
        setPrivacyFilter({ value: 'all', label: 'Все' });
        setColorFilter({ value: 'all', label: 'Любой' });
        setFriendsFilter(false);
    };

    return (
        <View activePanel="mainPanel">
            <Panel id="mainPanel">
                <div style={{ backgroundColor: '#5181b8', color: '#fff', padding: '12px', marginBottom: '16px', borderRadius: '8px' }}>
                    <h2 style={{ margin: '0' }}><span style={{backgroundColor: '#fff', color: '#5181b8', padding: '4px 8px', borderRadius: '5px', marginRight: '8px'}} >В</span>Контакте</h2>
                </div>
                <div style={{ backgroundColor: '#F7F7F7', padding: '12px', marginBottom: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '16px', width: '85%' }}>
                        <Select
                            options={privacyOptions}
                            value={privacyFilter.value}
                            onChange={(e: SelectChangeEvent<string>) => setPrivacyFilter({ value: e.target.value, label: e.target.value === 'all' ? 'Все' : e.target.value })}
                            label="Тип приватности"
                        />
                    </div>
                    <div style={{ marginBottom: '16px', width: '85%' }}>
                        <Select
                            options={colorOptions}
                            value={colorFilter.value}
                            onChange={(e: SelectChangeEvent<string>) => setColorFilter({ value: e.target.value, label: e.target.value === 'all' ? 'Любой' : e.target.value })}
                            label="Цвет аватарки"
                        />
                    </div>
                    <div style={{ width: '85%', display: 'flex', flexDirection: 'column' }}>
                        <Checkbox
                            checked={friendsFilter}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFriendsFilter(e.target.checked)}
                        >
                            Показывать только группы с друзьями
                        </Checkbox>
                        <Button onClick={handleResetFilters} style={{ alignSelf: 'flex-end', width: 'fit-content', marginBottom: '8px' }} >
                        Сбросить фильтры
                        </Button>
                    </div>
                </div>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }} >
                        <Spinner />
                    </div>
                ) : error ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
                        <h3>{error}</h3>
                        <Button onClick={handleReload}>Обновить</Button>
                        <img src={errorImage} alt="Ошибка загрузки" style={{ width: '50%' }}/>
                    </div>
                ) : filteredGroups.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
                        <h3>Список групп пуст</h3>
                        <img src={emptyImage} alt="Пустой список" style={{ width: '50%' }}/>
                    </div>
                ) : (
                    <>
                        <GroupListItem groups={filteredGroups} />
                    </>
                )}
            </Panel>
        </View>
    );
};

export default MainPage;
