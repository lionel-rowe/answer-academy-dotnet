using System;
using Microsoft.AspNetCore.Mvc;
using TechTest.Repositories;
using TechTest.Repositories.Models;
using System.Collections.Generic;

namespace TechTest.Controllers
{
    [Route("api/people")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        public PeopleController(IPersonRepository personRepository)
        {
            this.PersonRepository = personRepository;
        }

        private IPersonRepository PersonRepository { get; }

        [HttpGet]
        public IActionResult GetAll()
        {
            // DONE: Step 1

            // No extra logic required for handling the zero results case -
            // PersonRepository.GetAll() always returns an IEnumerable<Person>,
            // even if count is 0.
            IEnumerable<Person> people = PersonRepository.GetAll();

            return Ok(people);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // DONE: Step 2

            Person person = PersonRepository.Get(id);

            if (person == null) {
                return NotFound();
            }

            return Ok(person);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, PersonUpdate personUpdate)
        {
            // DONE: Step 3

            Person person = PersonRepository.Get(id);

            if (person == null) {
                return NotFound();
            }

            person.Authorised = personUpdate.Authorised;
            person.Enabled = personUpdate.Enabled;
            person.Colours = personUpdate.Colours;

            return Ok(person);
        }
    }
}
