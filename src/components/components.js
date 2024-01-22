import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from './tablecomponent';
import {AutocompleteComboBox} from './autocompleteComboBox';
import { Button, Container, Row, Col, NavDropdown } from 'react-bootstrap';
import Highlighter from 'react-highlight-words';
import { yellow } from '@mui/material/colors';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const mouseHover = () => {
        setIsOpen(true);
    };

    const mouseLeave = () => {
        setIsOpen(false);
    };
    return (
    <Navbar expand="lg" bg='dark' variant='dark' className='bg-body-teritiary'>
        <Container>
        <NavbarBrand> Tutorial Search System</NavbarBrand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'/>
        <Navbar.Collapse > 
            <Nav className="w-50 justify-content-between">
                <Nav.Link className="font-weight-bold" href='/'> Home </Nav.Link>
                <NavDropdown
                    className="font-weight-bold"
                    title="Tutorial"
                    show={isOpen}
                    onMouseEnter={mouseHover}
                    onMouseLeave={mouseLeave}
                >
                    <NavDropdown.Item href='/singleselect'>Single Select</NavDropdown.Item>
                    <NavDropdown.Item href='/'>Multiple Select</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="font-weight-bold" href='/'> Contact </Nav.Link>
                <Nav.Link className="font-weight-bold" href='/'> Others </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
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
    
    const fetchTableData = async ( page = 1, perPage=10) => {
        if(selectedTopic&&selectedSubTopic&&page&&perPage){
        try {
            const adjustPage = page-1;
            const response = await axios.get(`http://localhost:8080/api/fetchTutorialLinks?topicName=${selectedTopic}&subTopicName=${selectedSubTopic}&page=${adjustPage}&size=${perPage}`);
            let outputData = response.data.outputData
            setTutorialLink(outputData.tutorialLink);
            setData(outputData.tutorialLink);
            setTotalRows(outputData.toltalCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }}
      };

    
      const columns = [
        {
          name: 'links',
          selector: row => 
          <a href={row.links} target='_blank' rel="noopener noreferrer" >
            <Highlighter 
                activeStyle={{backgroundColor: yellow}}
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={row.links}
            />
            </a>,
        },
        {
            name: "source",
            selector: row=> 
            <Highlighter 
                searchWords={[searchTerm]}
                autoEscape={true}
                textToHighlight={row.sourceId.name}
            />,
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
        (link.links && link.links.toLowerCase().indexOf(changedvalue.toLowerCase()) !== -1) ||
        (link.sourceId && link.sourceId.name && link.sourceId.name.toLowerCase().indexOf(changedvalue.toLowerCase) !== -1)
    );
        setData(filteredLinks);
        setTotalRows(filteredLinks.length)
      };

      useEffect(()=>{
        fetchTableData(page, perPage);
      },[page, perPage])


    useEffect(() => {
        const fetchTopics= async () =>{
            try{
                const response = await axios.get("http://localhost:8080/api/fetchTopics");
                const data = response.data.outputData;
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
            const fetchSubTopics= async () =>{
                try{
                    setSelectedSubTopic(null);
                    const response = await axios.get("http://localhost:8080/api/fetchSubTopics", {params: params});
                    const data = response.data.outputData;
                    setSubtopics(data);
                    if(initialState){ setSelectedSubTopic(data[0].name); }
                    
                }
                catch(error){
                    console.error(error);
                }
            };
        fetchSubTopics();}
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
            <Container fluid className="mt-5"> 
                <Row className="justify-content-center"> 
                    <Col xs={12} md={6} lg={4} className="mb-3"> 
                        <AutocompleteComboBox topics={topics} selectedTopics={setSelectedTopic} lableName="Topic" value={selectedTopic} />
                    </Col>
                        
                    <Col xs={12} md={6} lg={4} className="mb-3 mx-auto"> 
                        <AutocompleteComboBox topics={subtopics} selectedTopics={setSelectedSubTopic} lableName="Sub Topic" value={selectedSubTopic} />
                    </Col>
                        
                    <Col xs={12} md={6} lg={4} className="mb-3 text-md-end"> 
                        <Button variant='success' onClick={submitOnclick}>submit</Button>
                    </Col>
                </Row>
            </Container>
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
        </React.Fragment>
    );
}