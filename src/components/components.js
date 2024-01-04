import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './tablecomponent';
import AutocompleteComboBox from './autocompleteComboBox';
import { Button, Stack } from 'react-bootstrap';

export const Header = () => {
    return (
    <div className="header">
        <h1>Tutorial Search System</h1>
    </div>
    );
}

export const TopicsSearchBar = () => {
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [subtopics, setSubtopics] = useState([]);
    const [selectedSubTopic, setSelectedSubTopic] = useState(null);
    const [tutorialLink, setTutorialLink] = useState({});
    const [data, setData] = useState();
    const [totalRows, setTotalRows] = useState();
    const [loading, setLoading] = useState(false);
    const [perPage,setPerPage] =useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [initialState, setInitialState] = useState(true);

    const fetchSubTopics= async (params) =>{
        try{
            setSelectedSubTopic(null);
            const response = await axios.get("http://localhost:8080/api/fetchSubTopics", {params: params});
            const data = response.data;
            setSubtopics(data);
            if(initialState){ setSelectedSubTopic(data[0].name); }
            
        }
        catch(error){
            console.error(error);
        }
    };
    
    const fetchTableData = async ( page = 1, perPage=10) => {
        if(selectedTopic&&selectedSubTopic&&page&&perPage){
        try {
            const adjustPage = page-1;
            const response = await axios.get(`http://localhost:8080/api/fetchTutorialLinks?topicName=${selectedTopic}&subTopicName=${selectedSubTopic}&page=${adjustPage}&size=${perPage}`);         
            setTutorialLink(response.data.tutorialLink);
            setData(response.data.tutorialLink);
            setTotalRows(response.data.toltalCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }}
      };

    
      const columns = [
        {
          name: 'links',
          selector: row => <a href={row.links} target='_blank' rel="noopener noreferrer" >{row.links}</a>,
        },
        {
            name: "source",
            selector: row=> row.sourceId.name,
            sortable: true, 
        }
      ];


      const handleChangePage = (page) => {
        setLoading(true);
        setPage(page);
      };

      const handlePerRowsChange = (newPerPage, page) => {
        setLoading(true);
        setPerPage(newPerPage);
        setPage(page);
        
      };

      const handleSearch = (changedvalue) => {
        setSearchTerm(changedvalue);
        const filteredLinks = tutorialLink.filter((link) =>
          link.links.includes(searchTerm) || link.sourceId.name.includes(searchTerm)
        );
        setData(filteredLinks);
      };

      useEffect(()=>{
        fetchTableData(page, perPage);
      },[page, perPage])


    useEffect(() => {
        const fetchTopics= async () =>{
            try{
                const response = await axios.get("http://localhost:8080/api/fetchTopics");
                const data = response.data;
                setTopics(data);
                if (initialState){ setSelectedTopic(data[0].name); }
            }
            catch(error){
                console.error(error);
            }
        };
        fetchTopics();
    },[])

    useEffect(()=>{
        if(selectedTopic){
            let params = {
                topicName: selectedTopic
            };
        fetchSubTopics(params);}
    },[selectedTopic]);

    useEffect(()=>{

        if(selectedSubTopic && selectedTopic && initialState){
            fetchTableData();
            setInitialState(false);
        }
    },[selectedTopic,selectedSubTopic]);

    const submitOnclick = async () =>{
        
        if (selectedTopic && selectedSubTopic) {
            fetchTableData()
        }
        else(
            alert("please select Topic and Sub-Topic")
        )
    }
    return(
        <React.Fragment>
            <div style={{ width:'95%', marginLeft: '30px', marginRight:"30px" }}>
            <Stack direction="horizontal" gap={5} className=" mx-auto">
                <div className="p-2 col-md-4">
                    <AutocompleteComboBox topics={topics} selectedTopics={setSelectedTopic} lableName="Topic" value={selectedTopic} />
                </div>
                <div className="p-2 col-md-4">
                    <AutocompleteComboBox topics={subtopics} selectedTopics={setSelectedSubTopic} lableName="Sub Topic" value={selectedSubTopic} />
                </div>
                <div className="p-2 ms-auto">
                    <Button variant='success' onClick={submitOnclick}>submit</Button>
                </div>
            </Stack>
            <br></br>
            <TableComponent
                data={data}
                columns={columns}
                totalRows={totalRows}
                handleChangePage={handleChangePage}
                handlePerRowsChange={handlePerRowsChange}
                handleSearch = {handleSearch}
                paginationPerPage = {perPage}
                loading={loading}
            />
        </div>
        </React.Fragment>
    );
}