import { useState, useEffect } from 'react';
import axios from 'axios';
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';

//import { useQuery } from 'react-query'; //react query is a library that makes it easy to fetch data and keep it in sync with the server, cache and other parts of the application
//import { Link } from 'react-router-dom'; //Link is a component that allows you to navigate between routes in your application, react router dom is a library that allows you to navigate between different components


export function SelectDropdownSearch() {

    const [search, setSearch] = useState('');
    const [communities, setCommunities] = useState<string[]>([]);
    const [value, setValue] = useState<string | null>(null);

    const combobox = useCombobox({
        onDropdownClose: () => {
        combobox.resetSelectedOption();
        combobox.focusTarget();
        setSearch('');
        },

        onDropdownOpen: () => {
        combobox.focusSearchInput();
        },
    });

    useEffect(() => {
        axios.get('http://localhost:8080/community').then((response) => {

            const communityNames = response.data.map((community: { name: string}) => community.name);
            setCommunities(communityNames);
            console.log('COMMUNITY DATA', communityNames);
        })
        .catch((error) => {
            console.log('ERROR FETCHING COMMUNITY DATA', error);
        });
    }, []);

  
    const options = communities
        .filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()))
        .map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
        ));

    return (
        <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
            setValue(val);
            combobox.closeDropdown();
        }}
        >
        <Combobox.Target>
            <InputBase
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            >
            {value || <Input.Placeholder>Pick value</Input.Placeholder>}
            </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
            <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search communities"
            />
            <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
            </Combobox.Options>
        </Combobox.Dropdown>
        </Combobox>
  );
}