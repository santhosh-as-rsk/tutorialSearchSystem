import React,{useEffect, useState} from 'react';
import "../css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AutocompleteMultipleSelect } from './autocompleteComboBox';
import axios from 'axios';
import { Button, Container, Col, Row } from 'react-bootstrap';
import TableComponent from './tablecomponent';
import Highlighter from 'react-highlight-words';


export function MultiSelectTopicsSearchBar (){
    const [topics, setTopics] = React.useState([])
    const [subTopics, setSubTopics] = React.useState([])
    const [selectedSubTopics, setSelectedSubTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = React.useState([])
    const [perPage,setPerPage] =useState(10);
    const [tutorialLink, setTutorialLink] = useState({});
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchTopics= async () =>{
          try{
              const response = await axios.get("http://localhost:8080/api/fetchTopics");
              const data = response.data;
              setTopics(data.outputData);
          }
          catch(error){
              console.error(error);
          }
      };
      fetchTopics();
    },[])

    const fetchSubTopics= async (selectedTopics) =>{
                
        try{
            const response = await axios.get(`http://localhost:8080/api/fetchMultipleSubTopics?topicNames=${selectedTopics}`,);
            const data = response.data;
            setSubTopics(data.outputData);
        }
        catch(error){
            console.error(error);
        }
    };

    useEffect(()=>{
        
        if(selectedTopics.length>0){
        fetchSubTopics(selectedTopics);}
        else{
            setSubTopics([]);
        }
    },[selectedTopics]);

    const fetchTableData = async ( page = 1, perPage=10) => {
        if(selectedTopics&&selectedSubTopics&&page&&perPage){
        try {
            const adjustPage = page-1;
            const response = await axios.get(`http://localhost:8080/api/fetchTutorialLinkMultipleSubTopics?subTopicNames=${selectedSubTopics}&page=${adjustPage}&size=${perPage}`);
            setTutorialLink(response.data.outputData.tutorialLink);
            setData(response.data.outputData.tutorialLink);
            setTotalRows(response.data.outputData.toltalCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setLoading(false);
        }}
      };

    const submitOnclick = async () =>{
        
        if (selectedTopics.length > 0 && selectedSubTopics.length > 0) {
            fetchTableData()
        }
        else(
            alert("please select Topic and Sub-Topic")
        )
    }

    const columns = [
        {
            name: 'Topics',
            selector: row => 
              <Highlighter 
                  activeStyle={{backgroundColor: "yellow"}}
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={row.subTopicsId.topicsId.name}
              />,
        },
        {
            name: 'Sub Topics',
            selector: row => 
              <Highlighter 
                  activeStyle={{backgroundColor: "yellow"}}
                  searchWords={[searchTerm]}
                  autoEscape={true}
                  textToHighlight={row.subTopicsId.name}
              />,
        },
        {
            name: 'links',
            selector: row => 
            <a href={row.links} target='_blank' rel="noopener noreferrer" >
              <Highlighter 
                  activeStyle={{backgroundColor: "yellow"}}
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
        (link.subTopicsId.name && link.subTopicsId.name.toLowerCase().indexOf(changedvalue.toLowerCase()) !== -1) ||
        (link.subTopicsId.topicsId.name && link.subTopicsId.topicsId.name.toLowerCase().indexOf(changedvalue.toLowerCase()) !== -1) ||
        (link.sourceId && link.sourceId.name && link.sourceId.name.toLowerCase().indexOf(changedvalue.toLowerCase) !== -1)
    );
        setData(filteredLinks);
        setTotalRows(filteredLinks.length)
      };

      useEffect(()=>{
        fetchTableData(page, perPage);
      },[page, perPage])

      const handleDownload = ()=>{

      }
  
    return(
        <React.Fragment>
            
            <Container fluid className="mt-5"> 
                <Row className="justify-content-center"> 
                    <Col xs={12} md={6} lg={4} className="mb-3"> 
                        <AutocompleteMultipleSelect topics={topics} selectedTopics={selectedTopics} setSelectedTopics={setSelectedTopics} labelName='Topics' />
                    </Col>
                    
                    <Col xs={12} md={6} lg={4} className="mb-3 mx-auto"> 
                        <AutocompleteMultipleSelect topics={subTopics} selectedTopics={selectedSubTopics} setSelectedTopics={setSelectedSubTopics} labelName='Sub Topics' />
                    </Col>
                    
                    <Col xs={12} md={6} lg={1} className="mb-3 text-md-end"> 
                        <Button variant='success' onClick={submitOnclick} >submit</Button>
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
                handleDownload={handleDownload}
            />
        </React.Fragment>
        );
    }


function MultipleSelect(){

    return( 
        <React.Fragment>
            <div >
            <br></br>
            <MultiSelectTopicsSearchBar/>
            </div>
        </React.Fragment>
    );
}

export default MultipleSelect;